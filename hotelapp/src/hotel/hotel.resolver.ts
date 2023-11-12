import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HotelService } from './hotel.service';
import { Hotel } from './entities/hotel.entity';
import { CreateHotelInput } from './dto/create-hotel.input';
import { UpdateHotelInput } from './dto/update-hotel.input';

@Resolver(() => Hotel)
export class HotelResolver {
  constructor(private readonly hotelService: HotelService) {}

  @Mutation(() => Hotel)
  createHotel(@Args('createHotelInput') createHotelInput: CreateHotelInput) {
    return this.hotelService.create(createHotelInput);
  }

  @Query(() => [Hotel], { name: 'hotel' })
  findAll() {
    return this.hotelService.findAll();
  }

  @Query(() => Hotel, { name: 'hotel' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.hotelService.findOne(id);
  }

  @Mutation(() => Hotel)
  updateHotel(@Args('updateHotelInput') updateHotelInput: UpdateHotelInput) {
    return this.hotelService.update(updateHotelInput.id, updateHotelInput);
  }

  @Mutation(() => Hotel)
  removeHotel(@Args('id', { type: () => Int }) id: number) {
    return this.hotelService.remove(id);
  }
}
