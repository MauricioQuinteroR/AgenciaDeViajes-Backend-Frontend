import { CreateContactoInput } from './create-contacto.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateContactoInput extends PartialType(CreateContactoInput) {

}
