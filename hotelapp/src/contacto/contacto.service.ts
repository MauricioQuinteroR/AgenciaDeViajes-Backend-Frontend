import { Injectable } from '@nestjs/common';
import { CreateContactoInput } from './dto/create-contacto.input';
import { UpdateContactoInput } from './dto/update-contacto.input';

@Injectable()
export class ContactoService {
  create(createContactoInput: CreateContactoInput) {
    return 'This action adds a new contacto';
  }

  findAll() {
    return `This action returns all contacto`;
  }

  findOne(id: number) {
    return `This action returns a #${id} contacto`;
  }

  update(id: number, updateContactoInput: UpdateContactoInput) {
    return `This action updates a #${id} contacto`;
  }

  remove(id: number) {
    return `This action removes a #${id} contacto`;
  }
}
