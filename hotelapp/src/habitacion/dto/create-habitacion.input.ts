import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateHabitacionInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
