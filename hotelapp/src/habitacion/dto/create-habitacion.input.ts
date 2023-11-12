import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateHabitacionInput {
  @Field()
  numero: string;

  @Field()
  tipo: string;

  @Field({ nullable: true })
  descripcion?: string;

  @Field(() => Float)
  precioBase: number;

  @Field(() => Float, { nullable: true })
  impuesto?: number;

  @Field()
  hotelId: string;

}