import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';
import { Hotel, HotelSchema } from './entities/hotel.entity';

@Module({
  imports:[
    PassportModule.register({defaultStrategy: 'jwt'}),
    MongooseModule.forFeature([{ name: Hotel.name, schema: HotelSchema }]),
  ],
  controllers: [HotelController],
  providers: [HotelService],
  exports:[HotelService]
})
export class HotelModule {}
