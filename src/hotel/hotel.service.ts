import { Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';


@Injectable()
export class HotelService {
  create(createHotelDto: CreateHotelDto) {
    return createHotelDto;
  }

}
