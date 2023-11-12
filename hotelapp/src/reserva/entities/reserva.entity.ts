import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Reserva {
  @Field(() => Int)
  @Prop()
  id: number;

  @Field(() => Date)
  @Prop({ required: true })
  fechaEntrada: Date;

  @Field(() => Date)
  @Prop({ required: true })
  fechaSalida: Date;

  @Field(() => Int)
  @Prop({ required: true })
  cantidadPersonas: number;

  @Field(() => String)
  @Prop({ required: true, ref: 'Habitacion' })
  habitacionId: string; // Referencia al ID de la Habitación reservada

  @Field(() => String)
  @Prop({ required: true, ref: 'Huesped' })
  huespedId: string; // Referencia al ID del Huésped que realiza la reserva

  // Puedes agregar más campos aquí según sean necesarios, como el estado de la reserva (confirmada, cancelada, etc.)
}

export type ReservaDocument = Reserva & Document;
export const ReservaSchema = SchemaFactory.createForClass(Reserva);
