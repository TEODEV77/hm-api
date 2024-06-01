import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Room } from './entities/room.entity';
import { Model } from 'mongoose';
import { duplicateKey } from 'src/utils/errors/duplicate-key';
import { HotelService } from '../hotel/hotel.service';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
    private readonly hotelService: HotelService,
  ) {}

  async create(hotelId: string, createRoomDto: CreateRoomDto) {
    const hotel = await this.hotelService.findOneById(hotelId);
    if (!hotel) throw new NotFoundException('Hotel not found');
    try {
      createRoomDto.hotel = hotelId;
      createRoomDto.base_cost = this.calculateBaseCost(createRoomDto.type);
      const room = await this.roomModel.create(createRoomDto);
      return room;
    } catch (error) {
      if (error.code === 11000) {
        duplicateKey('Room name');
        return;
      }
      if (!(error instanceof BadRequestException)) {
        throw new InternalServerErrorException(error);
      } else {
        throw new BadRequestException(`Room could n't be created `);
      }
    }
  }

  async findOneById(id: string) {
    try {
      const room = await this.roomModel.findOne({ _id: id });
      if (!room) throw new NotFoundException('Room not found');
      return room;
    } catch (error) {
      if (!(error instanceof BadRequestException)) {
        throw new InternalServerErrorException('An unexpected error occurred');
      } else {
        throw new BadRequestException('Room id is invalid');
      }
    }
  }

  

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    const room = await this.findOneById(id);
    await this.roomModel.findByIdAndUpdate(id, updateRoomDto);
    return { ...room.toJSON(), ...updateRoomDto };
  }

  calculateBaseCost(roomType: string) {
    switch (roomType) {
      case 'single':
        return 120;
      case 'standard':
        return 150;
      case 'double':
        return 175;
      case 'suite':
        return 235;
    }
  }
}
