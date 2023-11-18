import { CreateHabitacionInput } from './create-habitacion.input';
import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHabitacionInput extends PartialType(CreateHabitacionInput) {
    @Field({ nullable: true })
    tipo?: string;
  
    @Field({ nullable: true })
    impuestos?: number;
  
    @Field({ nullable: true })
    costoBase?: number;
  
    @Field({ nullable: true })
    hotelId?: string;

    @Field({ nullable: true })
    nombrefoto?: string;
  
    @Field({ nullable: true })
    active?: string;
}
