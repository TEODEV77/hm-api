import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BcryptModule } from './third-party/bcrypt/bcrypt.module';
import { ConfigModule } from '@nestjs/config';
import { Environment } from './config/environment';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { JwTokenModule } from './third-party/jw-token/jw-token.module';
import { HotelModule } from './hotel/hotel.module';
import { AccommodationModule } from './accommodation/accommodation.module';
import { RoomModule } from './room/room.module';
import { ReservationModule } from './reservation/reservation.module';
import { MailModule } from './third-party/mail/mail.module';

@Module({
  imports: [
    AuthModule,
    BcryptModule,
    JwTokenModule,
    ConfigModule.forRoot({ load: [Environment] }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    HotelModule,
    AccommodationModule,
    RoomModule,
    ReservationModule,
    MailModule,
    
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
