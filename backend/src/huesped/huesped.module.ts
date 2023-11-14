import { Module } from '@nestjs/common';
import { HuespedService } from './huesped.service';
import { HuespedResolver } from './huesped.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Huesped, HuespedSchema } from './entities/huesped.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Huesped.name, schema: HuespedSchema }]),
  ],
  providers: [HuespedResolver, HuespedService],
})
export class HuespedModule {}
