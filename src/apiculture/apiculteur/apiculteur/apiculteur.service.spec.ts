import { Test, TestingModule } from '@nestjs/testing';
import { ApiculteurService } from './apiculteur.service';

describe('ApiculteurService', () => {
  let service: ApiculteurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiculteurService],
    }).compile();

    service = module.get<ApiculteurService>(ApiculteurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
