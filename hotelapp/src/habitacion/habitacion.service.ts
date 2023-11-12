import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Habitacion, HabitacionDocument } from './entities/habitacion.entity';
import { CreateHabitacionInput } from './dto/create-habitacion.input';
import { UpdateHabitacionInput } from './dto/update-habitacion.input';

@Injectable()
export class HabitacionService {
  constructor(@InjectModel(Habitacion.name) private habitacionModel: Model<HabitacionDocument>) {}

  async create(createHabitacionDto: CreateHabitacionInput): Promise<Habitacion> {
    const newHabitacion = new this.habitacionModel(createHabitacionDto);
    return newHabitacion.save();
  }

  async findAll(): Promise<Habitacion[]> {
    return this.habitacionModel.find().exec();
  }

  async findOneById(id: string): Promise<Habitacion> {
    const habitacion = await this.habitacionModel.findById(id).exec();
    if (!habitacion) {
      throw new NotFoundException(`Habitación con ID "${id}" no encontrada`);
    }
    return habitacion;
  }

  async update(id: string, updateHabitacionDto: UpdateHabitacionInput): Promise<Habitacion> {
    const updatedHabitacion = await this.habitacionModel.findByIdAndUpdate(id, updateHabitacionDto, { new: true }).exec();
    if (!updatedHabitacion) {
      throw new NotFoundException(`Habitación con ID "${id}" no encontrada`);
    }
    return updatedHabitacion;
  }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    const result = await this.habitacionModel.findByIdAndDelete(id);
    if (!result) {
      return { deleted: false, message: 'Habitación no encontrada' };
    }
    return { deleted: true };
  }
}