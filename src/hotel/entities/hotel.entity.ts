import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Hotel extends Document {

  @Prop({ type: String, required: true })
  owner: string;

  @Prop({ type: String, required: true, unique: true, index: true })
  name: string;

  @Prop({ type: String, required: true, index: true })
  email: string;

  @Prop({ type: String, required: true, index: true })
  city: string;

  @Prop({ type: Number, required: true, min:1, max: 7, index: true })
  stars: number;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
    index: true ,
  })
  status: 'active' | 'inactive';

  @Prop({ type: Number, required: true, min: 0, max: 35 })
  commission: number;
}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
