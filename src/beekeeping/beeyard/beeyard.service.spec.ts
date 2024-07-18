import { Test, TestingModule } from '@nestjs/testing';
import { BeeyardService } from './beeyard.service';

describe('BeeyardService', () => {
  let service: BeeyardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeeyardService],
    }).compile();

    service = module.get<BeeyardService>(BeeyardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
