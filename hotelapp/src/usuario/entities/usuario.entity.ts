import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class Usuario {
  @Field(() => Int)
  @Prop()
  id: number;

  @Field()
  @Prop({ required: true, unique: true })
  email: string; // O nombre de usuario, si prefieres

  @Prop({ required: true })
  password: string; // Notar que no usamos @Field aquí para no exponer la contraseña en la API GraphQL

  // Otros campos como roles, estado del usuario, etc., pueden ser añadidos aquí
}

export type UsuarioDocument = Usuario & Document;
export const UsuarioSchema = SchemaFactory.createForClass(Usuario);
