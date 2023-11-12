import { Module } from '@nestjs/common';
import { ContactoService } from './contacto.service';
import { ContactoResolver } from './contacto.resolver';

@Module({
  providers: [ContactoResolver, ContactoService],
})
export class ContactoModule {}
