import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccommodationService } from './accommodation.service';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { UserRole } from 'src/auth/utils/user.roles.enum';
import { Authorize } from 'src/auth/decorators/authorize.decorator';
import { CreateAccommodationDto } from './dto/create-accommodation.dto';

@ApiBearerAuth()
@ApiTags('Accommodations')
@Controller('accommodation')
export class AccommodationController {
  constructor(private readonly accommodationService: AccommodationService) {}

  @ApiParam({
    name: 'hotelId',
    description: 'ID of the hotel this room belongs to',
    type: String,
    required: true,
    example: '6498a8f0e071b0c53c98a401',
  })
  @ApiParam({
    name: 'roomId',
    description: 'Room ID',
    type: String,
    required: true,
    example: '6498a8f0e071b0c53c98a401',
  })
  @Authorize(UserRole.Admin, UserRole.TravelAgent)
  @Post(':hotelId/:roomId')
  create(
    @Param('hotelId') hotelId: string,
    @Param('roomId') roomId: string,
    @Body() createAccommodationDto: CreateAccommodationDto,
  ) {
    return this.accommodationService.create(
      hotelId,
      roomId,
      createAccommodationDto,
    );
  }

  @Get()
  getByStartDateAndEndDate(@Body() createAccommodationDto: CreateAccommodationDto){
    return this.accommodationService.getByStartDateAndEndDate(createAccommodationDto);
  }
}
