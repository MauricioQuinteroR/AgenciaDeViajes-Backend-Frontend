import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateHuespedInput {
  @Field()
  nombres: string;

  @Field()
  apellidos: string;

  @Field()
  tipoDocumento: string;

  @Field()
  numeroDocumento: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  telefono?: string;

  @Field({ nullable: true })
  genero?: string;

  @Field({ nullable: true })
  fechaNacimiento?: Date;
}
