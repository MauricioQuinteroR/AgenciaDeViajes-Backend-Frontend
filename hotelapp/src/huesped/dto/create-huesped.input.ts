import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateHuespedInput {
  @Field()
  nombre: string;

  @Field()
  apellido: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  telefono?: string;

  @Field()
  documentoIdentidad: string;

}
