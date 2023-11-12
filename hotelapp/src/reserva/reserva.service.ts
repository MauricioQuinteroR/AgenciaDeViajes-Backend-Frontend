import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reserva, ReservaDocument } from './entities/reserva.entity';
import { CreateReservaInput } from './dto/create-reserva.input';
import { UpdateReservaInput } from './dto/update-reserva.input';


@Injectable()
export class ReservaService {
  constructor(@InjectModel(Reserva.name) private reservaModel: Model<ReservaDocument>) {}

  async create(createReservaDto: CreateReservaInput): Promise<Reserva> {
    const newReserva = new this.reservaModel(createReservaDto);
    return newReserva.save();
  }

  async findAll(): Promise<Reserva[]> {
    return this.reservaModel.find().exec();
  }

  async findOneById(id: string): Promise<Reserva> {
    const reserva = await this.reservaModel.findById(id).exec();
    if (!reserva) {
      throw new NotFoundException(`Reserva con ID "${id}" no encontrada`);
    }
    return reserva;
  }

  async update(id: string, updateReservaDto: UpdateReservaInput): Promise<Reserva> {
    const updatedReserva = await this.reservaModel.findByIdAndUpdate(id, updateReservaDto, { new: true }).exec();
    if (!updatedReserva) {
      throw new NotFoundException(`Reserva con ID "${id}" no encontrada`);
    }
    return updatedReserva;
  }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    const result = await this.reservaModel.findByIdAndDelete(id);
    if (!result) {
      return { deleted: false, message: 'Reserva no encontrada' };
    }
    return { deleted: true };
  }
}