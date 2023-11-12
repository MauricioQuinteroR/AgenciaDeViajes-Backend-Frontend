import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Contacto {
  @Field(() => Int)
  @Prop()
  id: number;

  @Field()
  @Prop({ required: true })
  nombreCompleto: string;

  @Field()
  @Prop({ required: true })
  telefonoContacto: string;

  // Si necesitas almacenar la relación con el huésped (que tendría este contacto de emergencia), puedes agregar un campo aquí.
  // @Field(type => Huésped)
  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Huésped' })
  // huesped: Huésped;

  // Considera añadir otros campos aquí según las necesidades de tu aplicación.
}

export type ContactoDocument = Contacto & Document;
export const ContactoSchema = SchemaFactory.createForClass(Contacto);
