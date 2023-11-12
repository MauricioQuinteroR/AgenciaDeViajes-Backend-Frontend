import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType() 
@Schema({ 
  timestamps: true,
  collection: 'reserva' 
})
export class Reserva {
  @Field(() => ID)
  id: string;

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

  @Field(() => Boolean)
  @Prop({ default: true })
  active: boolean;

  @Field()
  @Prop()
  createdAt: Date;

  @Field()
  @Prop()
  updatedAt: Date;
}

export type ReservaDocument = Reserva & Document;
export const ReservaSchema = SchemaFactory.createForClass(Reserva);

// Agregar un campo virtual para id que retorne _id - para manejar la conversión de _id (un objeto en MongoDB) a id (una string en GraphQL).
ReservaSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Asegurarse de que los campos virtuales sean incluidos en las respuestas
ReservaSchema.set('toJSON', {
  virtuals: true,
});
