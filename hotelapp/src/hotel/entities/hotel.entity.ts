import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Hotel {
  @Field(() => Int)
  @Prop()
  id: number;

  @Field()
  @Prop({ required: true })
  nombre: string;

  @Field({ nullable: true })
  @Prop()
  ubicacion: string;

  @Field({ nullable: true })
  @Prop()
  descripcion: string;

  // Considera agregar otros campos aquí según las necesidades de tu aplicación, 
  // como un campo para el estado del hotel (activo/inactivo), etc.
}

export type HotelDocument = Hotel & Document;
export const HotelSchema = SchemaFactory.createForClass(Hotel);
