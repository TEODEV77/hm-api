import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt , IsOptional } from "class-validator";
import { ReservationStatus } from "../entities/enums/reservation.enum";
import { EmergencyContact, Guest } from "../entities/reservation.entity";


export class CreateReservationDto {
    
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

  @ApiProperty({
    description: 'Hotel Check-in',
    type: Date,
    required: true,
    example: '2024-06-07',
  })
  @IsDateString()
  check_in: string;

  @ApiProperty({
    description: 'Hotel Check-out',
    type: Date,
    required: true,
    example: '2024-07-10',
  })
  @IsDateString()
  check_out: string;

  @ApiProperty({
    description: "Number of people included in the reservation",
    type: Number,
    required: true,
    example: 4,
  })
  @IsInt()
  number_of_people: number;

  @ApiProperty({
    description: 'Total of the reservation',
    type: Number,
    required: true,
    example: 2500,
  })
  @IsOptional()
  total: number;

  @ApiProperty({
    description: 'Status of the reservation: confirmed, cancelled, pending',
    type: String,
    enum: ReservationStatus,
    required: true,
    default: ReservationStatus.PENDING,
    example: 'pending',
  })
  @IsOptional()
  status: ReservationStatus;

  @ApiProperty({
    description: 'The ID of the hotel associated with the reservation',
    type: String,
    required: true,
    example: '665679dac125556849749c3a',
  })
  @IsOptional()
  hotel: string;

  @ApiProperty({
    description: 'The ID of the room associated with the reservation',
    type: String,
    required: true,
    example: '665a96e76c15d151742f0bec',
  })
  @IsOptional()
  room: string;

  @ApiProperty({
    description: 'An array of guests included in the reservation',
    type: [Guest],
    required: true,
  })
  
  @IsOptional()
  guests: Guest[];

  @ApiProperty({
    description: "Emergency contact information for the guest(s)",
    type: EmergencyContact,
    required: true,
  })
  @IsOptional()
  emergency_contact: EmergencyContact;
}

