import { Test, TestingModule } from '@nestjs/testing';
import { HoneycropController } from './honeycrop.controller';

describe('HoneycropController', () => {
  let controller: HoneycropController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HoneycropController],
    }).compile();

    controller = module.get<HoneycropController>(HoneycropController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
