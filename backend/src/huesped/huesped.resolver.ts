import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { HuespedService } from './huesped.service';
import { Huesped } from './entities/huesped.entity';
import { CreateHuespedInput } from './dto/create-huesped.input';
import { UpdateHuespedInput } from './dto/update-huesped.input';

@Resolver(of => Huesped)
export class HuespedResolver {
  constructor(private huespedService: HuespedService) {}

  @Query(returns => [Huesped])
  async huespedes() {
    return this.huespedService.findAll();
  }

  @Query(returns => Huesped, { nullable: true })
  async huespedById(@Args('id', { type: () => String }) id: string) {
    return this.huespedService.findOneById(id);
  }
  
  @Mutation(returns => Huesped)
  async createHuesped(@Args('createHuespedDto') createHuespedDto: CreateHuespedInput) {
    return this.huespedService.create(createHuespedDto);
  }

  @Mutation(returns => Huesped)
  async updateHuesped(
    @Args('id', { type: () => String }) id: string,
    @Args('updateHuespedDto') updateHuespedDto: UpdateHuespedInput,
  ) {
    return this.huespedService.update(id, updateHuespedDto);
  }

  @Mutation(returns => Boolean)
  async deleteHuesped(@Args('id', { type: () => String }) id: string) {
    const result = await this.huespedService.remove(id);
    if (!result.deleted) {
      throw new Error(result.message || 'Error al eliminar el huésped.');
    }
    return result.deleted;
  }
}