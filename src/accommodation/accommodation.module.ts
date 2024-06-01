import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { AccommodationService } from './accommodation.service';
import { AccommodationController } from './accommodation.controller';
import { Accommodation, AccommodationSchema } from './entities/accommodation.entity';
import { HotelModule } from 'src/hotel/hotel.module';
import { RoomModule } from 'src/room/room.module';


@Module({
  imports: [
    HotelModule,
    RoomModule, 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: Accommodation.name, schema: AccommodationSchema }]),
  ],
  controllers: [AccommodationController],
  providers: [AccommodationService]
})
export class AccommodationModule {}
