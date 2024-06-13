import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateHotelDto } from './create-hotel.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { HotelStatus } from '../enums/hotel-status.enum';

export class UpdateHotelDto extends PartialType(CreateHotelDto) {
  
  @ApiProperty({
    description: 'Current availability status of the hotel',
    enum: HotelStatus,
    example: 'available',
    default: 'available',
  })
  @IsOptional()
  @IsEnum(HotelStatus)
  status?: string;
}
