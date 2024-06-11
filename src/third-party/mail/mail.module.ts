import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigModule } from '@nestjs/config';
import { ReservationModule } from 'src/reservation/reservation.module';

@Module({
  imports: [ConfigModule, ReservationModule],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule {}
