import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Reservation } from './entities/reservation.entity';
import { Model } from 'mongoose';
import { HotelService } from 'src/hotel/hotel.service';
import { RoomService } from 'src/room/room.service';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { Room } from 'src/room/entities/room.entity';
import { ReservationStatus } from './entities/enums/reservation.enum';
import { UpdateRoomDto } from 'src/room/dto/update-room.dto';
import { RoomStatus } from 'src/room/enums';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private readonly reservationModel: Model<Reservation>,
    private readonly hotelService: HotelService,
    private readonly roomService: RoomService,
  ){

  }
  async create(idHotel: string, idRoom: string, createReservationDto: CreateReservationDto) {
    const hotel = await this.hotelService.findOneById(idHotel);
    const room = await this.roomService.findOneById(idRoom);
    this.checkHotel(hotel);
    this.checkRoom(room);
    createReservationDto.hotel = idHotel;
    createReservationDto.room = idRoom;
    createReservationDto.status = ReservationStatus.PENDING;
    const nights = this.calculateNights(createReservationDto.start_date, createReservationDto.end_date)
    const total = this.totalReservation(room,createReservationDto.number_of_people,nights);
    createReservationDto.total = total;
    try {
      const reservation = await this.reservationModel.create(createReservationDto);
      
      const updateReservationDto: UpdateReservationDto = {
        status: ReservationStatus.CONFIRMED
      }
      const updateReservation = await this.update(reservation.id, updateReservationDto);
      await this.updateRoom(idRoom);
      return updateReservation;
    } catch (error) {
      if (!(error instanceof BadRequestException)) {
        throw new InternalServerErrorException('An unexpected error occurred');
      } else {
        throw new BadRequestException(`Reservation could n't be created `);
      }
    }
  }

  async findOneById(idReservation: string) {
    try {
      const reservation = await this.reservationModel.findOne({ _id: idReservation });
      return reservation;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw new InternalServerErrorException('An unexpected error occurred');
      } else {
        throw new NotFoundException('Reservation not found');
      }
    }
  }

  async update(idReservation: string, updateReservationDto: UpdateReservationDto) {
    const reservation = await this.findOneById(idReservation);
    await this.reservationModel.findByIdAndUpdate(idReservation, updateReservationDto);
    return { ...reservation.toJSON(), ...updateReservationDto };
  }

  checkHotel(hotel: Hotel){
    if (!hotel || hotel.status === 'unavailable') {
      throw new BadRequestException(
        `Hotel with ID ${hotel._id} is not found or unavailable.`,
      );
    }
  }

  checkRoom(room: Room){
    if (!room || room.status === 'unavailable') {
      throw new BadRequestException(
        `Room with ID ${room._id} is not found or unavailable.`,
      );
    }
  }

  async findAll(){
    try {
      const reservations = await this.reservationModel.find();
      return reservations;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw new InternalServerErrorException('An unexpected error occurred');
      } else {
        throw new NotFoundException('Reservations not found');
      }
    }
  }

  calculateNights(start_date: string, end_date: string): number {
    const time = Math.abs(new Date(end_date).getTime() - new Date(start_date).getTime());
    const nights = Math.ceil(time / (1000 * 60 * 60 * 24));
    return nights;
  }

  totalReservation(room: Room, number_of_people: number, nights: number){
    const base = room.base_cost * number_of_people;
    const total = base * nights;
    return total;
  }

  async updateRoom(idRoom: string){
    const room : UpdateRoomDto = {
      status: RoomStatus.UNAVAILABLE
    }
    await this.roomService.update(idRoom, room);
  }

  
}
