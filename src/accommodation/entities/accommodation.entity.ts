import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { Room } from 'src/room/entities/room.entity';

@Schema()
export class Accommodation extends Document {
  @ApiProperty({
    description: 'Booking start date',
    type: Date,
    required: true,
    example: '2024-05-30',
  })
  @Prop({ type: Date, required: true })
  start_date: Date;

  @ApiProperty({
    description: 'Booking end date',
    type: Date,
    required: true,
    example: '2024-07-10',
  })
  @Prop({ type: Date, required: true })
  end_date: Date;

  @ApiProperty({
    description: 'ID of the hotel associated with the booking',
    type: String,
    required: true,
    example: '6498a8f0e071b0c53c98a401', 
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Hotel', required: true })
  hotel: Hotel;

  @ApiProperty({
    description: 'ID of the room associated with the booking',
    type: String,
    required: true,
    example: '6498a8f0e071b0c53c98a401', 
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Room', required: true })
  room: Room;
}

export const AccommodationSchema = SchemaFactory.createForClass(Accommodation);
