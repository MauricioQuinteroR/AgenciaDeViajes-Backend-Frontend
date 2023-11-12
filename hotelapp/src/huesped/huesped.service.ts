import { Injectable } from '@nestjs/common';
import { CreateHuespedInput } from './dto/create-huesped.input';
import { UpdateHuespedInput } from './dto/update-huesped.input';

@Injectable()
export class HuespedService {
  create(createHuespedInput: CreateHuespedInput) {
    return 'This action adds a new huesped';
  }

  findAll() {
    return `This action returns all huesped`;
  }

  findOne(id: number) {
    return `This action returns a #${id} huesped`;
  }

  update(id: number, updateHuespedInput: UpdateHuespedInput) {
    return `This action updates a #${id} huesped`;
  }

  remove(id: number) {
    return `This action removes a #${id} huesped`;
  }
}
