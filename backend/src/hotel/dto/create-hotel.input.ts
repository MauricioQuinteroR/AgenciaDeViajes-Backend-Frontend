import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateHotelInput {
  @Field()
  nombre: string;

  @Field({ nullable: false })
  ubicacion?: string;

  @Field({ nullable: false })
  descripcion?: string;
  
  @Field({ nullable: false })
  nombrefoto: string;

}
