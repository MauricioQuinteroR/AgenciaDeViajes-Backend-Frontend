import { Module } from '@nestjs/common';
import { ContactoService } from './contacto.service';
import { ContactoResolver } from './contacto.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Contacto, ContactoSchema } from './entities/contacto.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contacto.name, schema: ContactoSchema }]),
  ],
  providers: [ContactoResolver, ContactoService],
})
export class ContactoModule {}
