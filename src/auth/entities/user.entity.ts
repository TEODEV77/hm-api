import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from '../utils/user.roles.enum';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class User extends Document {
  @ApiProperty({
    example: 'Emily',
    description: `The user's first name.`,
  })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({
    example: 'Palacio',
    description: `The user's last name.`,
  })
  @Prop({ type: String, required: true })
  lastname: string;

  @ApiProperty({
    example: 'emily@test.com',
    description: `The user's unique email address`,
  })
  @Prop({ type: String, required: true, unique: true, index: true })
  email: string;

  @ApiProperty({
    example: '$2a$14$LybYdS7bgFZHBAW0m6nJZOsnm/pX3dgGf.n00K5vxpxdKMzd7wMO.',
    description: `'The user's password (hashed for security)`,
  })
  @Prop({ type: String, required: true })
  password: string;

  @ApiProperty({
    example: 'CLIENT',
    default: 'CLIENT',
    enum: UserRole,
    description: `'The user's role in hm.`,
  })
  @Prop({
    type: String,
    enum: UserRole,
    default: 'CLIENT',
  })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
