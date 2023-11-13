import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { HabitacionService } from './habitacion.service';
import { Habitacion } from './entities/habitacion.entity';
import { CreateHabitacionInput } from './dto/create-habitacion.input';
import { UpdateHabitacionInput } from './dto/update-habitacion.input';

@Resolver(of => Habitacion)
export class HabitacionResolver {
  constructor(private habitacionService: HabitacionService) {}

  @Query(returns => [Habitacion])
  async habitaciones() {
    return this.habitacionService.findAll();
  }

  @Query(returns => [Habitacion], { nullable: true })
  async habitacionesByHotelId(@Args('id', { type: () => String }) id: string) {
    return this.habitacionService.findByHotelId(id);
  }

  @Query(returns => Habitacion, { nullable: true })
  async habitacionById(@Args('id', { type: () => String }) id: string) {
    return this.habitacionService.findOneById(id);
  }
  
  @Mutation(returns => Habitacion)
  async createHabitacion(@Args('createHabitacionDto') createHabitacionDto: CreateHabitacionInput) {
    return this.habitacionService.create(createHabitacionDto);
  }

  @Mutation(returns => Habitacion)
  async updateHabitacion(
    @Args('id', { type: () => String }) id: string,
    @Args('updateHabitacionDto') updateHabitacionDto: UpdateHabitacionInput,
  ) {
    return this.habitacionService.update(id, updateHabitacionDto);
  }

  @Mutation(returns => Boolean)
  async deleteHabitacion(@Args('id', { type: () => String }) id: string) {
    const result = await this.habitacionService.remove(id);
    if (!result.deleted) {
      throw new Error(result.message || 'Error al eliminar la habitación.');
    }
    return result.deleted;
  }
}