import { Test, TestingModule } from '@nestjs/testing';
import { HarvesthoneyController } from './harvesthoney.controller';

describe('HarvesthoneyController', () => {
  let controller: HarvesthoneyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvesthoneyController],
    }).compile();

    controller = module.get<HarvesthoneyController>(HarvesthoneyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
