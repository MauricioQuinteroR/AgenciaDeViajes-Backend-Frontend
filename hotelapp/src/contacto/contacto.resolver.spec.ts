import { Test, TestingModule } from '@nestjs/testing';
import { ContactoResolver } from './contacto.resolver';
import { ContactoService } from './contacto.service';

describe('ContactoResolver', () => {
  let resolver: ContactoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContactoResolver, ContactoService],
    }).compile();

    resolver = module.get<ContactoResolver>(ContactoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
