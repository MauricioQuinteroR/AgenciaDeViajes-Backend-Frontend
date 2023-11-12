import { CreateHotelInput } from './create-hotel.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHotelInput extends PartialType(CreateHotelInput) {

  @Field({ nullable: true })
  nombre?: string;

  @Field({ nullable: true })
  ubicacion?: string;

  @Field({ nullable: true })
  descripcion?: string;

  @Field({ nullable: true })
  active?: string;


}
