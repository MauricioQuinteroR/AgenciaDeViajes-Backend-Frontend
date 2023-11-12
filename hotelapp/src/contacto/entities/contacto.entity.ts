import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Contacto {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
