import { CreateHuespedInput } from './create-huesped.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHuespedInput extends PartialType(CreateHuespedInput) {

}
