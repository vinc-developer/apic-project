import { Test, TestingModule } from '@nestjs/testing';
import { HoneycropService } from './honeycrop.service';

describe('HoneycropService', () => {
  let service: HoneycropService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HoneycropService],
    }).compile();

    service = module.get<HoneycropService>(HoneycropService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
