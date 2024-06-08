import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { HotelModule } from 'src/hotel/hotel.module';
import { RoomModule } from 'src/room/room.module';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservation, ReservationSchema } from './entities/reservation.entity';

@Module({
  imports: [
    HotelModule,
    RoomModule, 
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature([{ name: Reservation.name, schema: ReservationSchema }]),
  ],
  controllers: [ReservationController],
  providers: [ReservationService]
})
export class ReservationModule {}
