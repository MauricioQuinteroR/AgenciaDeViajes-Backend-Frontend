import { CreateHabitacionInput } from './create-habitacion.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHabitacionInput extends PartialType(CreateHabitacionInput) {

}
