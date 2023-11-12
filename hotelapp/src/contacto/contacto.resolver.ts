import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ContactoService } from './contacto.service';
import { Contacto } from './entities/contacto.entity';
import { CreateContactoInput } from './dto/create-contacto.input';
import { UpdateContactoInput } from './dto/update-contacto.input';

@Resolver(() => Contacto)
export class ContactoResolver {
  constructor(private readonly contactoService: ContactoService) {}

  @Mutation(() => Contacto)
  createContacto(@Args('createContactoInput') createContactoInput: CreateContactoInput) {
    return this.contactoService.create(createContactoInput);
  }

  @Query(() => [Contacto], { name: 'contacto' })
  findAll() {
    return this.contactoService.findAll();
  }

  @Query(() => Contacto, { name: 'contacto' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.contactoService.findOne(id);
  }

  @Mutation(() => Contacto)
  updateContacto(@Args('updateContactoInput') updateContactoInput: UpdateContactoInput) {
    return this.contactoService.update(updateContactoInput.id, updateContactoInput);
  }

  @Mutation(() => Contacto)
  removeContacto(@Args('id', { type: () => Int }) id: number) {
    return this.contactoService.remove(id);
  }
}
