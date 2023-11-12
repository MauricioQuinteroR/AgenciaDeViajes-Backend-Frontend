import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HuespedService } from './huesped.service';
import { Huesped } from './entities/huesped.entity';
import { CreateHuespedInput } from './dto/create-huesped.input';
import { UpdateHuespedInput } from './dto/update-huesped.input';

@Resolver(() => Huesped)
export class HuespedResolver {
  constructor(private readonly huespedService: HuespedService) {}

  @Mutation(() => Huesped)
  createHuesped(@Args('createHuespedInput') createHuespedInput: CreateHuespedInput) {
    return this.huespedService.create(createHuespedInput);
  }

  @Query(() => [Huesped], { name: 'huesped' })
  findAll() {
    return this.huespedService.findAll();
  }

  @Query(() => Huesped, { name: 'huesped' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.huespedService.findOne(id);
  }

  @Mutation(() => Huesped)
  updateHuesped(@Args('updateHuespedInput') updateHuespedInput: UpdateHuespedInput) {
    return this.huespedService.update(updateHuespedInput.id, updateHuespedInput);
  }

  @Mutation(() => Huesped)
  removeHuesped(@Args('id', { type: () => Int }) id: number) {
    return this.huespedService.remove(id);
  }
}
