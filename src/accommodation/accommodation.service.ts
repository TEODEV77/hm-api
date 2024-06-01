import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Accommodation } from './entities/accommodation.entity';
import { Model } from 'mongoose';
import { HotelService } from 'src/hotel/hotel.service';
import { InjectModel } from '@nestjs/mongoose';
import { RoomService } from 'src/room/room.service';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';
import { duplicateKey } from 'src/utils/errors/duplicate-key';

@Injectable()
export class AccommodationService {
  constructor(
    @InjectModel(Accommodation.name)
    private readonly accommodationModel: Model<Accommodation>,
    private readonly hotelService: HotelService,
    private readonly roomService: RoomService,
  ) {}

  async create(
    hotelId: string,
    roomId: string,
    createAccommodationDto: CreateAccommodationDto,
  ) {
    try {
      await this.validateHotelAvailability(hotelId);
      await this.validateRoomAvailability(roomId);
      createAccommodationDto.hotel = hotelId;
      createAccommodationDto.room = roomId;
      const accommodation = await this.accommodationModel.create(
        createAccommodationDto,
      );
      return accommodation;
    } catch (error) {
      if (error.code === 11000) {
        duplicateKey('Accommodation name');
        return;
      }
      if (!(error instanceof BadRequestException)) {
        throw new InternalServerErrorException('An unexpected error occurred');
      } else {
        throw new BadRequestException(`Accommodation could n't be created `);
      }
    }
  }

  checkGenericStatus(status: string) {
    return status === 'available';
  }

  private async validateHotelAvailability(hotelId: string): Promise<boolean> {
    const hotel = await this.hotelService.findOneById(hotelId);
    if (!hotel) throw new NotFoundException('Hotel not found');
    if (!this.checkGenericStatus(hotel.status)) {
      throw new BadRequestException('Hotel is not available');
    }
    return true;
  }

  private async validateRoomAvailability(roomId: string): Promise<boolean> {
    const room = await this.roomService.findOneById(roomId);
    if (!room) throw new NotFoundException('Room not found');
    if (!this.checkGenericStatus(room.status)) {
      throw new BadRequestException('Room is not available');
    }
    return true;
  }

  async getByStartDateAndEndDate(createAccommodationDto: CreateAccommodationDto){
    
    const accommodations = await this.accommodationModel.find({
      start_date: { $lte: createAccommodationDto.start_date },
      end_date: { $gte: createAccommodationDto.end_date },
    }).populate('hotel').populate('room');
    return accommodations;
  }
}
