import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateReservaInput {
  @Field(() => String)
  hotelId: string;

  @Field(() => String)
  habitacionId: string;

  @Field(() => String)
  huespedId: string;

  @Field()
  fechaInicio: Date;

  @Field()
  fechaFin: Date;

  @Field(() => Int)
  numeroPersonas: number;

  @Field({ nullable: true })
  comentarios?: string;

}