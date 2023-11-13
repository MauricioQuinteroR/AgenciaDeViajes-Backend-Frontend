import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema({ 
  timestamps: true,
  collection: 'contacto' 
})
export class Contacto {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true })
  nombreCompleto: string;

  @Field()
  @Prop({ required: true })
  telefonoContacto: string;

  @Field()
  @Prop({ required: true })
  email: string;

  @Field(() => ID)
  @Prop({ required: true, ref: 'Hotel' })
  hotelId: string; // Referencia al ID del Hotel

  @Field(() => Boolean)
  @Prop({ default: true })
  active: boolean;

  @Field(() => Date)
  @Prop()
  createdAt: Date;

  @Field(() => Date)
  @Prop()
  updatedAt: Date;
}

export type ContactoDocument = Contacto & Document;
export const ContactoSchema = SchemaFactory.createForClass(Contacto);

// Campo virtual para id
ContactoSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Incluir campos virtuales en las respuestas
ContactoSchema.set('toJSON', {
  virtuals: true,
});