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

  // Si necesitas relacionar la habitación con un hotel específico, 
  // asegúrate de que este campo se maneje adecuadamente en tu backend.
  // Por ejemplo, podrías tener un campo para el ID del hotel si es necesario.
  @Field({ nullable: true })
  hotelId?: string;
}