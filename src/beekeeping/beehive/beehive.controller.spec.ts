import { Test, TestingModule } from '@nestjs/testing';
import { BeehiveController } from './beehive.controller';

describe('BeehiveController', () => {
  let controller: BeehiveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeehiveController],
    }).compile();

    controller = module.get<BeehiveController>(BeehiveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
