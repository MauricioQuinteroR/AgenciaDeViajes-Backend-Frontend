import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateHuespedInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
