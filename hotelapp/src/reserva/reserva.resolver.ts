import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ReservaService } from './reserva.service';
import { Reserva } from './entities/reserva.entity';
import { CreateReservaInput } from './dto/create-reserva.input';
import { UpdateReservaInput } from './dto/update-reserva.input';

@Resolver(of => Reserva)
export class ReservaResolver {
  constructor(private reservaService: ReservaService) {}

  @Query(returns => [Reserva])
  async reservas() {
    return this.reservaService.findAll();
  }

  @Query(returns => Reserva, { nullable: true })
  async reservaById(@Args('id', { type: () => String }) id: string) {
    return this.reservaService.findOneById(id);
  }
  
  @Mutation(returns => Reserva)
  async createReserva(@Args('createReservaDto') createReservaDto: CreateReservaInput) {
    return this.reservaService.create(createReservaDto);
  }

  @Mutation(returns => Reserva)
  async updateReserva(
    @Args('id', { type: () => String }) id: string,
    @Args('updateReservaDto') updateReservaDto: UpdateReservaInput,
  ) {
    return this.reservaService.update(id, updateReservaDto);
  }

  @Mutation(returns => Boolean)
  async deleteReserva(@Args('id', { type: () => String }) id: string) {
    const result = await this.reservaService.remove(id);
    if (!result.deleted) {
      throw new Error(result.message || 'Error al eliminar la reserva.');
    }
    return result.deleted;
  }
}