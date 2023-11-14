import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema({ 
  timestamps: true,
  collection: 'usuario' 
})
export class Usuario {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

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

export type UsuarioDocument = Usuario & Document;

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);

// Agregar un campo virtual para id que retorne _id - para manejar la conversión de _id (un objeto en MongoDB) a id (una string en GraphQL).
UsuarioSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Asegurarse de que los campos virtuales sean incluidos en las respuestas
UsuarioSchema.set('toJSON', {
  virtuals: true,
});

