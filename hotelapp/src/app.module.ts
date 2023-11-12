import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HotelModule } from './hotel/hotel.module';
import { HabitacionModule } from './habitacion/habitacion.module';
import { ReservaModule } from './reserva/reserva.module';
import { HuespedModule } from './huesped/huesped.module';
import { ContactoModule } from './contacto/contacto.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    HotelModule,
    HabitacionModule, 
    ReservaModule, 
    HuespedModule, 
    ContactoModule, UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
