import { Controller, Post, Body, Req, Patch, Param, Get } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { Authorize } from 'src/auth/decorators/authorize.decorator';
import { UserRole } from 'src/auth/utils/user.roles.enum';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateHotelSwagger } from './decorators/post.hotel.decorator';
import { UpdateHotelSwagger } from './decorators/patch.hotel.decorator';

@ApiBearerAuth()
@ApiTags('hotels')
@Controller('hotels')
export class HotelController {
  constructor(
    private readonly hotelService: HotelService,
  ) {}

  @CreateHotelSwagger()
  @Authorize(UserRole.Admin, UserRole.TravelAgent)
  @Post()
  create(@Req() req, @Body() createHotelDto: CreateHotelDto) {
    const owner = req.user.id;
    return this.hotelService.create(owner,createHotelDto);
  }

  @Authorize(UserRole.Admin, UserRole.TravelAgent)
  @Get()
  findHotelsByOwner(@Req() req){
    const owner = req.user.id;
    return this.hotelService.findHotelsByOwner(owner);
  }

  @UpdateHotelSwagger()
  @Authorize(UserRole.Admin, UserRole.TravelAgent)
  @Patch(':id')
  update(@Req() req, @Param('id') id : string, @Body() updateHotelDto: UpdateHotelDto){
    const owner = req.user.id;
    return this.hotelService.update(owner,id,updateHotelDto);
  }
}
