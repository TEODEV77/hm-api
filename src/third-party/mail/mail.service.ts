import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as nodemailer from 'nodemailer';
import { ReservationDetailsHtml } from './templates/htmlTemplate';
import Mail from 'nodemailer/lib/mailer';
import { ReservationService } from 'src/reservation/reservation.service';


@Injectable()
export class MailService {


  constructor(private readonly configService: ConfigService, private readonly reservationService: ReservationService) {}

  private mailTransport() {
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('MAILER_HOST'),
      port: this.configService.get<number>('MAILER_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('MAIL_USER'),
        pass: this.configService.get<string>('MAIL_PASS'),
      },
    });

    return transporter;
  }
  
  async sendEmail(reservationId: string){
    const reservation = await this.reservationService.findOneById(reservationId);
    const transporter = this.mailTransport();
    const html = ReservationDetailsHtml(reservation);
    const to = "test@test.com"
    const subject = "Reservation details";
    const options: Mail.Options = {
      from:  {
        name: reservation.hotel.name,
        address: reservation.hotel.email,
      },
      to,
      subject,
      html,
    };

    try {
      const result = await transporter.sendMail(options);
      return result;
    } catch (error) {
      if (!(error instanceof BadRequestException)) {
        throw new InternalServerErrorException('An unexpected error occurred');
      } else {
        throw new BadRequestException(`Email couldn't be sent`);
      }
    }
  }

}
