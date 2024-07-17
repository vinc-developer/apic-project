import { Test, TestingModule } from '@nestjs/testing';
import { BeekeeperController } from './beekeeper.controller';

describe('BeekeeperController', () => {
  let controller: BeekeeperController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeekeeperController],
    }).compile();

    controller = module.get<BeekeeperController>(BeekeeperController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
