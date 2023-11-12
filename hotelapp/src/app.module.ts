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

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot('mongodb+srv://alzheimeer:Qazwsxx2@clusterhotel.qytz5nr.mongodb.net/?retryWrites=true&w=majority'),
    HotelModule,
    HabitacionModule, 
    ReservaModule, 
    HuespedModule, 
    ContactoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
