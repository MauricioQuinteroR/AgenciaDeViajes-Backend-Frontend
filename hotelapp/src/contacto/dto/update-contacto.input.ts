import { CreateContactoInput } from './create-contacto.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateContactoInput extends PartialType(CreateContactoInput) {
  @Field(() => Int)
  id: number;
}
