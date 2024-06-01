import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class CreateAccommodationDto {
  @ApiProperty({
    description: 'Booking start date',
    type: Date,
    required: true,
    example: '2024-05-30',
  })
  @IsDateString()
  start_date: string;

  @ApiProperty({
    description: 'Booking end date',
    type: Date,
    required: true,
    example: '2024-07-10',
  })
  @IsDateString()
  end_date: string;

  @IsOptional()
  hotel: string;

  @IsOptional()
  room: string;
}
