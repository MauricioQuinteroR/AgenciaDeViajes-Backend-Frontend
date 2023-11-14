import { Module } from '@nestjs/common';
import { HabitacionService } from './habitacion.service';
import { HabitacionResolver } from './habitacion.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Habitacion, HabitacionSchema } from './entities/habitacion.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Habitacion.name, schema: HabitacionSchema }]),
  ],
  providers: [HabitacionResolver, HabitacionService],
})
export class HabitacionModule {}
