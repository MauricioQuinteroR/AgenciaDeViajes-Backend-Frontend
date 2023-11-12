import { Module } from '@nestjs/common';
import { HuespedService } from './huesped.service';
import { HuespedResolver } from './huesped.resolver';

@Module({
  providers: [HuespedResolver, HuespedService],
})
export class HuespedModule {}
