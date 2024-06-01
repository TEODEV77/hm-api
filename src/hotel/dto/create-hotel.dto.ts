import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateHotelDto {
  

  @IsOptional()
  @IsString()
  owner: string;

  @ApiProperty({
    example: 'Grand Oasis Resort',
    description: `The hotel's name.`,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'grand.oasis@hm.com',
    description: `The hotel's email address`,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'Cancun',
    description: 'The city where the hotel is located.',
  })
  @IsString()
  @IsNotEmpty()
  city: string;
  
  @ApiProperty({
    example: 5,
    minimum: 0,
    maximum: 7,
    description: `The hotel's star rating (0 to 7).`,
  })
  @IsInt()
  @Min(0)
  @Max(7)
  stars: number;
  
  @ApiProperty({
    example: '123 Main Street, Cancun, Mexico',
    description: `The hotel's street address.`,
  })
  @IsString()
  @IsNotEmpty()
  address: string;
  
  @ApiProperty({
    example: 'A luxurious hotel with stunning views.',
    description: 'A brief description of the hotel and its amenities.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;
  
  @ApiProperty({
    example: 15,
    minimum: 0,
    maximum: 35,
    description: 'The commission percentage the hotel',
  })
  @IsNumber()
  @Min(0)
  @Max(35)
  commission: number;
}
