import { Test, TestingModule } from '@nestjs/testing';
import { BeekeeperService } from './beekeeper.service';

describe('BeekeeperService', () => {
  let service: BeekeeperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BeekeeperService],
    }).compile();

    service = module.get<BeekeeperService>(BeekeeperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
