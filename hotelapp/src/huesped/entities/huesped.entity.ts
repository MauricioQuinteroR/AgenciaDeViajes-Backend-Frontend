import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema({ 
  timestamps: true,
  collection: 'hesped' 
})
export class Huesped {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true })
  nombres: string;

  @Field()
  @Prop({ required: true })
  apellidos: string;

  @Field(() => Int)
  @Prop({ required: true })
  tipoDocumento: string; // Ejemplo: 'DNI', 'pasaporte', etc.

  @Field()
  @Prop({ required: true })
  numeroDocumento: string;

  @Field()
  @Prop()
  email: string;

  @Field()
  @Prop()
  telefono: string;

  @Field({ nullable: true })
  @Prop()
  genero: string; // Opcional, por ejemplo: 'masculino', 'femenino', 'otro'

  @Field({ nullable: true })
  @Prop()
  fechaNacimiento: Date; // Opcional

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

export type HuespedDocument = Huesped & Document;
export const HuespedSchema = SchemaFactory.createForClass(Huesped);

// Agregar un campo virtual para id que retorne _id - para manejar la conversión de _id (un objeto en MongoDB) a id (una string en GraphQL).
HuespedSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Asegurarse de que los campos virtuales sean incluidos en las respuestas
HuespedSchema.set('toJSON', {
  virtuals: true,
});
