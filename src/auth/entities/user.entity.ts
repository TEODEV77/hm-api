import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ required: true, type: String })
  lastname: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({
    type: String,
    enum: ['admin', 'travel agent', 'client'],
    default: 'client',
  })
  role: 'admin' | 'travel agent' | 'client';
}

export const UserSchema = SchemaFactory.createForClass(User);
