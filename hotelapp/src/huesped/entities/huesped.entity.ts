import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Huesped {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
