import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Huesped, HuespedDocument } from './entities/huesped.entity';
import { CreateHuespedInput } from './dto/create-huesped.input';
import { UpdateHuespedInput } from './dto/update-huesped.input';


@Injectable()
export class HuespedService {
  constructor(@InjectModel(Huesped.name) private huespedModel: Model<HuespedDocument>) {}

  async create(createHuespedDto: CreateHuespedInput): Promise<Huesped> {
    const newHuesped = new this.huespedModel(createHuespedDto);
    return newHuesped.save();
  }

  async findAll(): Promise<Huesped[]> {
    return this.huespedModel.find().exec();
  }

  async findOneById(id: string): Promise<Huesped> {
    const huesped = await this.huespedModel.findById(id).exec();
    if (!huesped) {
      throw new NotFoundException(`Huésped con ID "${id}" no encontrado`);
    }
    return huesped;
  }

  async update(id: string, updateHuespedDto: UpdateHuespedInput): Promise<Huesped> {
    const updatedHuesped = await this.huespedModel.findByIdAndUpdate(id, updateHuespedDto, { new: true }).exec();
    if (!updatedHuesped) {
      throw new NotFoundException(`Huésped con ID "${id}" no encontrado`);
    }
    return updatedHuesped;
  }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    const result = await this.huespedModel.findByIdAndDelete(id);
    if (!result) {
      return { deleted: false, message: 'Huésped no encontrado' };
    }
    return { deleted: true };
  }
}