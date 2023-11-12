import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Huesped {
  @Field(() => Int)
  @Prop()
  id: number;

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

  // Puedes agregar más campos aquí según sean necesarios.
}

export type HuespedDocument = Huesped & Document;
export const HuespedSchema = SchemaFactory.createForClass(Huesped);
