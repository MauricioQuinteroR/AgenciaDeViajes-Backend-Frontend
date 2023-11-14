import { CreateUserDto } from './create-usuario.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUsuarioInput extends PartialType(CreateUserDto) {
  @Field(() => Int)
  id: number;

}
