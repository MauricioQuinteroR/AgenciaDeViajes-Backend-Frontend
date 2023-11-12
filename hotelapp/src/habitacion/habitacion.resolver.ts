import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HabitacionService } from './habitacion.service';
import { Habitacion } from './entities/habitacion.entity';
import { CreateHabitacionInput } from './dto/create-habitacion.input';
import { UpdateHabitacionInput } from './dto/update-habitacion.input';

@Resolver(() => Habitacion)
export class HabitacionResolver {
  constructor(private readonly habitacionService: HabitacionService) {}

  @Mutation(() => Habitacion)
  createHabitacion(@Args('createHabitacionInput') createHabitacionInput: CreateHabitacionInput) {
    return this.habitacionService.create(createHabitacionInput);
  }

  @Query(() => [Habitacion], { name: 'habitacion' })
  findAll() {
    return this.habitacionService.findAll();
  }

  @Query(() => Habitacion, { name: 'habitacion' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.habitacionService.findOne(id);
  }

  @Mutation(() => Habitacion)
  updateHabitacion(@Args('updateHabitacionInput') updateHabitacionInput: UpdateHabitacionInput) {
    return this.habitacionService.update(updateHabitacionInput.id, updateHabitacionInput);
  }

  @Mutation(() => Habitacion)
  removeHabitacion(@Args('id', { type: () => Int }) id: number) {
    return this.habitacionService.remove(id);
  }
}
