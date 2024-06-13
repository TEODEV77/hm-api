import { Controller, Post, Param } from '@nestjs/common';
import { MailService } from './mail.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';


@ApiTags('mails')
@Controller('mails')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send-email/:reservationId')
  @ApiParam({
    name: 'reservationId',
    description: 'Reservation ID',
    type: String,
    required: true,
    example: '665a94ed3c995e1b530f1a85',
  })
  create(@Param('reservationId') reservationId: string) {
    return this.mailService.sendEmail(reservationId);
  }

  
}
