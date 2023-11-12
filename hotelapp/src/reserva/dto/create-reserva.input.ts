import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateReservaInput {
  @Field(() => String)
  habitacionId: string; // ID de la Habitación reservada

  @Field(() => String)
  huespedId: string; // ID del Huésped que realiza la reserva

  @Field(() => Date)
  fechaEntrada: Date;

  @Field(() => Date)
  fechaSalida: Date;

  @Field(() => Int)
  cantidadPersonas: number;

  // El campo 'comentarios' se ha eliminado en este ejemplo,
  // pero puedes incluirlo si es relevante para tu aplicación.
}
