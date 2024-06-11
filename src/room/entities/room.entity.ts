import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { RoomType, RoomStatus } from '../enums';
import { Hotel } from 'src/hotel/entities/hotel.entity';

@Schema()
export class Room extends Document {
  @ApiProperty({
    description: 'Unique room number (101, 205)',
    type: Number,
    required: true,
    example: 100,
  })
  @Prop({ type: Number , required: true, index: true })
  name: number;

  @ApiProperty({
    description: 'Floor number where the room is located',
    type: Number,
    required: true,
    example: 2,
  })
  @Prop({ type: Number, required: true, index: true })
  floor: number;

  @ApiProperty({
    description: 'Type of room (single, standard, double, suite)',
    enum: RoomType,
    required: true,
    example: 'suite',
  })
  @Prop({
    type: String,
    enum: RoomType,
    required: true,
    index: true,
  })
  type: string;

  @ApiProperty({
    description:
      `Base cost per night depends on the type of room 
      (SINGLE:120, STANDARD:150, DOUBLE:175, SUITE: 235) `,
    type: Number,
    required: true,
    example: 175,
  })
  @Prop({ type: Number, required: true })
  base_cost: number;

  @ApiProperty({
    description: 'Current availability status of the room',
    enum: RoomStatus,
    example: 'available',
    default: 'available',
  })
  @Prop({
    type: String,
    enum: RoomStatus,
    index: true,
    default: 'available',
  })
  status: string;

  @ApiProperty({
    description: 'Applicable taxes for the room ',
    type: Number,
    default: 19,
  })
  @Prop({ required: true, type: Number, default: 19 })
  taxes: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Hotel', required: true })
  hotel: Hotel;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
RoomSchema.index({ hotel: 1, name: 1 }, { unique: true });