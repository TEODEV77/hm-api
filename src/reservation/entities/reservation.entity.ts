import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { ReservationStatus } from './enums/reservation.enum';
import { Hotel } from 'src/hotel/entities/hotel.entity';
import { Room } from 'src/room/entities/room.entity';


@Schema({ _id: false })
export class EmergencyContact extends Document {
  @ApiProperty({
    description: "Emergency contact's full name",
    type: String,
    required: true,
    example: "Carl Smith",
  })
  @Prop({ required: true, type: String })
  full_name: string;

  @ApiProperty({
    description: "Emergency contact's phone number",
    type: String,
    required: true,
    example: "+1234567890",
  })
  @Prop({ required: true, type: String })
  phone: string;
}


@Schema({ _id: false })
export class Guest extends Document{
  @ApiProperty({
    description: "Guest's first name",
    type: String,
    required: true,
    example: 'John',
  })
  @Prop({ required: true, type: String })
  first_name: string;

  @ApiProperty({
    description: "Guest's last name",
    type: String,
    required: true,
    example: 'Doe',
  })
  @Prop({ required: true, type: String, index: true })
  last_name: string;

  @ApiProperty({
    description: "Guest's date of birth",
    type: Date,
    required: true,
    example: '1990-01-15',
  })
  @Prop({ required: true, type: Date })
  birth_date: Date;

  @ApiProperty({
    description: "Guest's gender",
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  })
  @Prop({
    type: String,
    enum: ['Male', 'Female'],
    required: true,
  })
  gender: 'Male' | 'Female';

  @ApiProperty({
    description:
      'Type of identification document (National ID card or Foreigner ID card)',
    type: String,
    enum: ['National ID card', 'Foreigner ID card'],
    required: true,
  })
  @Prop({
    type: String,
    enum: ['National ID card', 'Foreigner ID card'],
    required: true,
  })
  document_type: 'National ID card' | 'Foreigner ID card';

  @ApiProperty({
    description: "Guest's identification document number",
    type: String,
    required: true,
    example: '123456789',
  })
  @Prop({ required: true, type: String, index: true })
  document_number: string;

  @ApiProperty({
    description: "Guest's email address",
    type: String,
    required: true,
    example: 'johndoe@example.com',
  })
  @Prop({ required: true, type: String, index: true })
  email: string;

  @ApiProperty({
    description: "Guest's phone number",
    type: String,
    required: true,
    example: '+1234567890',
  })
  @Prop({ required: true, type: String, index: true })
  phone: string;
}

@Schema()
export class Reservation extends Document {
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
    description: 'Hotel Check-in',
    type: Date,
    required: true,
    example: '2024-06-07',
  })
  @Prop({ type: Date, required: true })
  check_in: Date;

  @ApiProperty({
    description: 'Hotel Check-out',
    type: Date,
    required: true,
    example: '2024-07-10',
  })
  @Prop({ type: Date, required: true })
  check_out: Date;

  @ApiProperty({
    description: "Number of people included in the reservation",
    type: Number,
    required: true,
    example: 4,
  })
  @Prop({ required: true, type: Number })
  number_of_people: number;

  @ApiProperty({
    description: 'Total of the reservation',
    type: Number,
    required: true,
    example: 2500,
  })
  @Prop({ type: Number, required: true })
  total: number;

  @ApiProperty({
    description: 'Status of the reservation: confirmed, cancelled, pending',
    type: String,
    enum: ReservationStatus,
    required: true,
    default: ReservationStatus.PENDING,
    example: 'pending',
  })
  @Prop({ type: String, required: true, default: ReservationStatus.PENDING })
  status: ReservationStatus;

  @ApiProperty({
    description: 'The ID of the hotel associated with the reservation',
    type: String,
    required: true,
    example: '66633b22a647ee3e9e9b2169',
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Hotel', required: true })
  hotel: Hotel;

  @ApiProperty({
    description: 'The ID of the room associated with the reservation',
    type: String,
    required: true,
    example: '665a96e76c15d151742f0bec',
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Room', required: true })
  room: Room;

  @ApiProperty({
    description: 'An array of guests included in the reservation',
    type: [Guest],
    required: true,
  })
  @Prop({ required: true, type: [Guest] })
  guests: Guest[];

  @ApiProperty({
    description: "Emergency contact information for the guest(s)",
    type: EmergencyContact,
    required: true,
  })
  @Prop({ required: true, type: EmergencyContact })
  emergency_contact: EmergencyContact;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
