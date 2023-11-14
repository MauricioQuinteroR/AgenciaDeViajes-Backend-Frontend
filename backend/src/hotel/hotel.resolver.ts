import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { HotelService } from './hotel.service';
import { Hotel } from './entities/hotel.entity';
import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';


@Resolver(of => Hotel)
export class HotelResolver {
  constructor(private hotelService: HotelService) {}

  @Query(returns => [Hotel])
  async hotels() {
    return this.hotelService.findAll();
  }

  @Query(returns => Hotel, { nullable: true })
  async hotelById(@Args('id', { type: () => String }) id: string) {
    return this.hotelService.findOneById(id);
  }
  
  @Mutation(returns => Hotel)
  async createHotel(@Args('createHotelDto') createHotelDto: CreateHotelInput) {
    return this.hotelService.create(createHotelDto);
  }

  @Mutation(returns => Hotel)
  async updateHotel(
    @Args('id', { type: () => String }) id: string,
    @Args('updateHotelDto') updateHotelDto: UpdateHotelInput,
  ) {
    return this.hotelService.update(id, updateHotelDto);
  }

  @Mutation(returns => Boolean)
  async deleteHotel(@Args('id', { type: () => String }) id: string) {
    const result = await this.hotelService.remove(id);
    if (!result.deleted) {
      throw new Error(result.message || 'Error al eliminar el hotel.');
    }
    return result.deleted;
  }

  @Mutation(returns => Hotel)
  async updateHotelActive(
    @Args('id', { type: () => String }) id: string,
    @Args('active', { type: () => Boolean }) active: boolean,
  ) {
    return this.hotelService.updateActive(id, active);
  }

}