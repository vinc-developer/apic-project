import { Test, TestingModule } from '@nestjs/testing';
import { HarvesthoneyService } from './harvesthoney.service';

describe('HarvesthoneyService', () => {
  let service: HarvesthoneyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HarvesthoneyService],
    }).compile();

    service = module.get<HarvesthoneyService>(HarvesthoneyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
