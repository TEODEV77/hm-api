import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from './create-room.dto';
import { RoomStatus } from '../enums';
import { IsEnum } from 'class-validator';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {
  @ApiProperty({
    description: 'Current availability status of the room',
    enum: RoomStatus,
    example: 'available',
    default: 'available',
  })
  @IsEnum(RoomStatus)
  status?: string;

  @ApiProperty({
    description: 'Applicable taxes for the room ',
    type: Number,
    default: 19,
  })
  taxes?: number;

}
