import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateHotelDto } from './create-hotel.dto';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class UpdateHotelDto extends PartialType(CreateHotelDto) {
  
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(['active', 'inactive'])
  status?: string;
}
