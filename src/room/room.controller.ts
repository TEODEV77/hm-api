import { Controller, Body, Param, Post ,Patch, Get} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Authorize } from 'src/auth/decorators/authorize.decorator';
import { UserRole } from 'src/auth/utils/user.roles.enum';

@ApiBearerAuth()
@Controller('rooms')
@ApiTags('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @ApiParam({
    name: 'hotelId',
    description: 'ID of the hotel this room belongs to',
    type: String,
    required: true,
    example: '665a94ed3c995e1b530f1a85',
  })
  @Authorize(UserRole.Admin, UserRole.TravelAgent)
  @Post(':hotelId')
  create(
    @Param('hotelId') hotelId: string,
    @Body() createRoomDto: CreateRoomDto,
  ) {
    return this.roomService.create(hotelId,createRoomDto);
  }

  @Patch(':roomId')
  @ApiParam({
    name: 'roomId',
    description: 'Room ID',
    type: String,
    required: true,
    example: '665a94ed3c995e1b530f1a85',
  })
  @Authorize(UserRole.Admin, UserRole.TravelAgent)
  update(
    @Param('roomId') roomId: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ){
    return this.roomService.update(roomId, updateRoomDto);
  }

  @ApiParam({
    name: 'hotelId',
    description: 'ID of the hotel',
    type: String,
    required: true,
    example: '665a94ed3c995e1b530f1a85',
  })
  @Authorize(UserRole.Admin, UserRole.TravelAgent)
  @Get(':hotelId')
  findByHotel(@Param('hotelId') hotelId: string){
    return this.roomService.findByHotel(hotelId);
  }

  
}
