import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { ContactoService } from './contacto.service';
import { Contacto } from './entities/contacto.entity';
import { CreateContactoInput } from './dto/create-contacto.input';
import { UpdateContactoInput } from './dto/update-contacto.input';

@Resolver(of => Contacto)
export class ContactoResolver {
  constructor(private contactoService: ContactoService) {}

  @Query(returns => [Contacto])
  async contactos() {
    return this.contactoService.findAll();
  }

  @Query(returns => Contacto, { nullable: true })
  async contactoById(@Args('id', { type: () => String }) id: string) {
    return this.contactoService.findOneById(id);
  }
  
  @Mutation(returns => Contacto)
  async createContacto(@Args('createContactoDto') createContactoDto: CreateContactoInput) {
    return this.contactoService.create(createContactoDto);
  }

  @Mutation(returns => Contacto)
  async updateContacto(
    @Args('id', { type: () => String }) id: string,
    @Args('updateContactoDto') updateContactoDto: UpdateContactoInput,
  ) {
    return this.contactoService.update(id, updateContactoDto);
  }

  @Mutation(returns => Boolean)
  async deleteContacto(@Args('id', { type: () => String }) id: string) {
    const result = await this.contactoService.remove(id);
    if (!result.deleted) {
      throw new Error(result.message || 'Error al eliminar el contacto.');
    }
    return result.deleted;
  }
}