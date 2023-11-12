import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Habitacion {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
