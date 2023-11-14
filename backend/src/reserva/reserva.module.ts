import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaResolver } from './reserva.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Reserva, ReservaSchema } from './entities/reserva.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reserva.name, schema: ReservaSchema }]),
  ],
  providers: [ReservaResolver, ReservaService],
})
export class ReservaModule {}
