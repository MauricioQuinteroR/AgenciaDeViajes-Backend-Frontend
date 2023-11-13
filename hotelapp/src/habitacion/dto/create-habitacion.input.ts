import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateHabitacionInput {
  @Field()
  tipo: string; // 'simple', 'doble', 'suite'

  @Field(() => Int)
  costoBase: number;

  @Field(() => Int, { nullable: true })
  impuestos?: number;

  @Field()
  estado: string; // 'disponible', 'ocupada', 'en mantenimiento'

  @Field()
  hotelId: string; // ID del hotel al que pertenece la habitación
}