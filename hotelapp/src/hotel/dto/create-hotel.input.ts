import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateHotelInput {
  @Field()
  nombre: string;

  @Field({ nullable: true })
  ubicacion?: string;

  @Field({ nullable: true })
  descripcion?: string;

}
