import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateContactoInput {
  @Field()
  nombreCompleto: string;

  @Field({ nullable: true })
  telefonoContacto: string;

  @Field({ nullable: true })
  email: string;

  @Field()
  hotelId: string; // ID del hotel asociado

}