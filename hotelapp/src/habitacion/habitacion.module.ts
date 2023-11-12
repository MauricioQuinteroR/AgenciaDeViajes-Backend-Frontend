import { Module } from '@nestjs/common';
import { HabitacionService } from './habitacion.service';
import { HabitacionResolver } from './habitacion.resolver';

@Module({
  providers: [HabitacionResolver, HabitacionService],
})
export class HabitacionModule {}
