import { Test, TestingModule } from '@nestjs/testing';
import { BeeyardController } from './beeyard.controller';

describe('BeeyardController', () => {
  let controller: BeeyardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeeyardController],
    }).compile();

    controller = module.get<BeeyardController>(BeeyardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
