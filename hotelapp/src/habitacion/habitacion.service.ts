import { Injectable } from '@nestjs/common';
import { CreateHabitacionInput } from './dto/create-habitacion.input';
import { UpdateHabitacionInput } from './dto/update-habitacion.input';

@Injectable()
export class HabitacionService {
  create(createHabitacionInput: CreateHabitacionInput) {
    return 'This action adds a new habitacion';
  }

  findAll() {
    return `This action returns all habitacion`;
  }

  findOne(id: number) {
    return `This action returns a #${id} habitacion`;
  }

  update(id: number, updateHabitacionInput: UpdateHabitacionInput) {
    return `This action updates a #${id} habitacion`;
  }

  remove(id: number) {
    return `This action removes a #${id} habitacion`;
  }
}
