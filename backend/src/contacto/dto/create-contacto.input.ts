import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateContactoInput {
  @Field({ nullable: false })
  nombreCompleto: string;

  @Field({ nullable: false })
  telefonoContacto: string;

  @Field({ nullable: false })
  reservaId: string; // ID de la reserva asociada

}