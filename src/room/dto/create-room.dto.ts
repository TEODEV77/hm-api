import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { RoomStatus, RoomType } from '../enums';

export class CreateRoomDto {
  @ApiProperty({
    description: 'Unique room number (101, 205)',
    type: Number,
    required: true,
    example: 100,
  })
  @IsNumber()
  name: number;

  @ApiProperty({
    description: 'Floor number where the room is located',
    type: Number,
    required: true,
    example: 2,
  })
  @IsNumber()
  floor: number;

  @ApiProperty({
    description: 'Type of room (single, standard, double, suite)',
    enum: RoomType,
    required: true,
    example: 'suite',
  })
  @IsEnum(RoomType)
  type: string;

  @ApiProperty({
    description: `Base cost per night depends on the type of room 
          (SINGLE:120, STANDARD:150, DOUBLE:175, SUITE: 235) `,
    type: Number,
    required: true,
    example: 175,
  })
  @IsOptional()
  @IsNumber()
  base_cost: number;

  @ApiProperty({
    description: 'Current availability status of the room',
    enum: RoomStatus,
    example: 'available',
  })
  @IsOptional()
  @IsEnum(RoomStatus)
  status: string;

  @IsOptional()
  @IsString()
  hotel: string;
}
