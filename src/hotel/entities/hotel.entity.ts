import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HotelStatus } from '../enums/hotel-status.enum';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Hotel extends Document {

  @ApiProperty({
    example: '665a21be288688063a0a972f',  
    description: 'The ID of the hotel owner (extracted from the JWT token)',
  })
  @Prop({ type: String, required: true })
  owner: string;

  @ApiProperty({
    example: 'Grand Oasis Resort',
    description: `The hotel's name.`,
  })
  @Prop({ type: String, required: true, unique: true, index: true })
  name: string;

  @ApiProperty({
    example: 'grand.oasis@hm.com',
    description: `The hotel's email address`,
  })
  @Prop({ type: String, required: true, index: true })
  email: string;

  @ApiProperty({
    example: 'Cancun',
    description: 'The city where the hotel is located.',
  })
  @Prop({ type: String, required: true, index: true })
  city: string;

  @ApiProperty({
    example: 5,
    minimum: 0,
    maximum: 7,
    description: `The hotel's star rating (0 to 7).`,
  })
  @Prop({ type: Number, required: true, min:1, max: 7, index: true })
  stars: number;

  @ApiProperty({
    example: '123 Main Street, Cancun, Mexico',
    description: `The hotel's street address.`,
  })
  @Prop({ type: String, required: true })
  address: string;

  @ApiProperty({
    example: 'A luxurious hotel with stunning views.',
    description: 'A brief description of the hotel and its amenities.',
  })
  @Prop({ type: String, required: true })
  description: string;

  @ApiProperty({
    description: 'Current availability status of the hotel',
    enum: HotelStatus,
    example: 'available',
    default: 'available',
  })
  @Prop({
    type: String,
    enum: HotelStatus,
    index: true,
    default: 'available',
  })
  status: string;


  @ApiProperty({
    example: 15,
    minimum: 0,
    maximum: 35,
    description: 'The commission percentage the hotel',
  })
  @Prop({ type: Number, required: true, min: 0, max: 35 })
  commission: number;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
