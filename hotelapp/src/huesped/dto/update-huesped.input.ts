import { CreateHuespedInput } from './create-huesped.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateHuespedInput extends PartialType(CreateHuespedInput) {
  @Field(() => Int)
  id: number;
}
