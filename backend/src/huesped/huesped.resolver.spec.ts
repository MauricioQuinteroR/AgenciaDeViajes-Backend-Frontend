import { Test, TestingModule } from '@nestjs/testing';
import { HuespedResolver } from './huesped.resolver';
import { HuespedService } from './huesped.service';

describe('HuespedResolver', () => {
  let resolver: HuespedResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HuespedResolver, HuespedService],
    }).compile();

    resolver = module.get<HuespedResolver>(HuespedResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
