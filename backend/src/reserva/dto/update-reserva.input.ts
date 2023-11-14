import { CreateReservaInput } from './create-reserva.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateReservaInput extends PartialType(CreateReservaInput) {

}
