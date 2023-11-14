import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contacto, ContactoDocument } from './entities/contacto.entity';
import { CreateContactoInput } from './dto/create-contacto.input';
import { UpdateContactoInput } from './dto/update-contacto.input';

@Injectable()
export class ContactoService {
  constructor(@InjectModel(Contacto.name) private contactoModel: Model<ContactoDocument>) {}

  async create(createContactoDto: CreateContactoInput): Promise<Contacto> {
    const newContacto = new this.contactoModel(createContactoDto);
    return newContacto.save();
  }

  async findAll(): Promise<Contacto[]> {
    return this.contactoModel.find().exec();
  }

  async findOneById(id: string): Promise<Contacto> {
    const contacto = await this.contactoModel.findById(id).exec();
    if (!contacto) {
      throw new NotFoundException(`Contacto con ID "${id}" no encontrado`);
    }
    return contacto;
  }

  async update(id: string, updateContactoDto: UpdateContactoInput): Promise<Contacto> {
    const updatedContacto = await this.contactoModel.findByIdAndUpdate(id, updateContactoDto, { new: true }).exec();
    if (!updatedContacto) {
      throw new NotFoundException(`Contacto con ID "${id}" no encontrado`);
    }
    return updatedContacto;
  }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    const result = await this.contactoModel.findByIdAndDelete(id);
    if (!result) {
      return { deleted: false, message: 'Contacto no encontrado' };
    }
    return { deleted: true };
  }
}