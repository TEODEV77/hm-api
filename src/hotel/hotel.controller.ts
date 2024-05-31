import { Controller, Post, Body, Req, Patch, Param } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { Authorize } from 'src/auth/decorators/authorize.decorator';
import { UserRole } from 'src/auth/utils/user.roles.enum';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Controller('hotel')
export class HotelController {
  constructor(
    private readonly hotelService: HotelService,
  ) {}

  @Authorize(UserRole.Admin, UserRole.TravelAgent)
  @Post()
  create(@Req() req, @Body() createHotelDto: CreateHotelDto) {
    const owner = req.user.id;
    return this.hotelService.create(owner,createHotelDto);
  }

  @Authorize(UserRole.Admin, UserRole.TravelAgent)
  @Patch(':id')
  update(@Req() req, @Param('id') id : string, @Body() updateHotelDto: UpdateHotelDto){
    const owner = req.user.id;
    return this.hotelService.update(owner,id,updateHotelDto);
  }
}
