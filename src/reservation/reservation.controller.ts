import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Authorize } from 'src/auth/decorators/authorize.decorator';
import { UserRole } from 'src/auth/utils/user.roles.enum';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiParam({
    name: 'hotelId',
    description: 'ID of the hotel',
    type: String,
    required: true,
    example: '6498a8f0e071b0c53c98a401',
  })
  @ApiParam({
    name: 'roomId',
    description: 'ID of the room',
    type: String,
    required: true,
    example: '6498a8f0e071b0c53c98a401',
  })
  
  @Post(':hotelId/:roomId')
  create(
    @Param('hotelId') hotelId: string,
    @Param('roomId') roomId: string,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    return this.reservationService.create(
      hotelId,
      roomId,
      createReservationDto,
    );
  }

  @Authorize(UserRole.Admin)
  @Get()
  findAll() {
    return this.reservationService.findAll();
  }


  @ApiParam({
    name: 'hotelId',
    description: 'ID of the hotel',
    type: String,
    required: true,
    example: '6498a8f0e071b0c53c98a401',
  })
  @Authorize(UserRole.Admin, UserRole.TravelAgent)
  @Get(':hotelId')
  findByHotel(@Param('hotelId') hotelId: string){
    return this.reservationService.findByHotel(hotelId);
  }


}
