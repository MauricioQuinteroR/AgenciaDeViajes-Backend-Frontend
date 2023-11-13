import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateHabitacionInput {
  @Field({ nullable: false })
  tipo: string; // 'simple', 'doble', 'suite'

  @Field(() => Int, { nullable: false })
  costoBase: number;

  @Field(() => Int, { nullable: true })
  impuestos?: number;

  @Field({ nullable: false })
  estado: string; // 'disponible', 'ocupada', 'en mantenimiento'

  @Field({ nullable: false })
  hotelId: string; // ID del hotel al que pertenece la habitación

  @Field({ nullable: false })
  nombrefoto: string;
}