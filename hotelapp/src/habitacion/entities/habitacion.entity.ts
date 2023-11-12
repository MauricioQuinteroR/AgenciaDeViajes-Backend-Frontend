import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Habitacion {
  @Field(() => Int)
  @Prop()
  id: number;

  @Field()
  @Prop({ required: true })
  tipo: string; // Por ejemplo: 'simple', 'doble', 'suite'

  @Field(() => Int)
  @Prop({ required: true })
  costoBase: number;

  @Field(() => Int)
  @Prop()
  impuestos: number;

  @Field()
  @Prop({ required: true })
  estado: string; // Por ejemplo: 'disponible', 'ocupada', 'en mantenimiento'

  // Considera añadir otros campos aquí según las necesidades de tu aplicación, como número de habitación, capacidad, etc.
}

export type HabitacionDocument = Habitacion & Document;
export const HabitacionSchema = SchemaFactory.createForClass(Habitacion);
