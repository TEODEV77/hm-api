import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Hotel } from './entities/hotel.entity';
import { Model } from 'mongoose';
import { duplicateKey } from 'src/utils/errors/duplicate-key';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectModel(Hotel.name)
    private readonly hotelModel: Model<Hotel>,
  ) {}
  async create(owner: string, createHotelDto: CreateHotelDto) {
    createHotelDto.owner = owner;
    Object.freeze(createHotelDto);
    try {
      const hotel = await this.hotelModel.create(createHotelDto);
      return hotel;
    } catch (error) {
      if (error.code === 11000) {
        duplicateKey('Hotel name');
        return;
      }
      if (!(error instanceof BadRequestException)) {
        throw new InternalServerErrorException('An unexpected error occurred');
      }
    }
  }

  async findHotelsByOwner(owner: string) {
    try {
      const hotels = await this.hotelModel.find({ owner });
      if (!hotels) return [];
      return hotels;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw new InternalServerErrorException('An unexpected error occurred');
      } else {
        throw new NotFoundException('Hotels not found');
      }
    }
  }

  async findOneById(id: string) {
    try {
      const hotel = await this.hotelModel.findOne({ _id: id });
      return hotel;
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw new InternalServerErrorException('An unexpected error occurred');
      } else {
        throw new NotFoundException('Hotel not found');
      }
    }
  }

  async update(ownerId: string, id: string, updateHotelDto: UpdateHotelDto) {
    const hotel = await this.findOneById(id);
    if (hotel.owner != ownerId)
      throw new UnauthorizedException('You can only modify your own hotels');
    await this.hotelModel.findByIdAndUpdate(id, updateHotelDto);
    return { ...hotel.toJSON(), ...updateHotelDto };
  }
}
