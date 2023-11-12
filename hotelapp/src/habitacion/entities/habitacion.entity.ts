import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema({ 
  timestamps: true,
  collection: 'habitacion' 
})
export class Habitacion {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true })
  tipo: string; // Por ejemplo: 'simple', 'doble', 'suite'

  @Field(() => Int)
  @Prop({ required: true })
  costoBase: number;

  @Field(() => Int, { nullable: true })
  @Prop()
  impuestos?: number;

  @Field()
  @Prop({ required: true })
  estado: string; // Por ejemplo: 'disponible', 'ocupada', 'en mantenimiento'

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

export type HabitacionDocument = Habitacion & Document;
export const HabitacionSchema = SchemaFactory.createForClass(Habitacion);

// Agregar un campo virtual para id que retorne _id - para manejar la conversión de _id (un objeto en MongoDB) a id (una string en GraphQL).
HabitacionSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Asegurarse de que los campos virtuales sean incluidos en las respuestas
HabitacionSchema.set('toJSON', {
  virtuals: true,
});
