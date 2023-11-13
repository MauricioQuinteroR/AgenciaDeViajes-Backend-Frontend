import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema({ 
  timestamps: true,
  collection: 'hotel'
})
export class Hotel {
  @Field(() => ID)
  id: string;

  @Field()
  @Prop({ required: true })
  nombre: string;

  @Field({ nullable: false })
  @Prop({ required: true })
  ubicacion: string;

  @Field({ nullable: false })
  @Prop({ required: true })
  descripcion: string;
  
  @Field( {nullable: false})
  @Prop({ required: true })
  nombrefoto: string;

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

export type HotelDocument = Hotel & Document;
export const HotelSchema = SchemaFactory.createForClass(Hotel);

// Agregar un campo virtual para id que retorne _id - para manejar la conversión de _id (un objeto en MongoDB) a id (una string en GraphQL).
HotelSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Asegurarse de que los campos virtuales sean incluidos en las respuestas
HotelSchema.set('toJSON', {
  virtuals: true,
});
