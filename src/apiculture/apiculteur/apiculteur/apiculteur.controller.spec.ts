import { Test, TestingModule } from '@nestjs/testing';
import { ApiculteurController } from './apiculteur.controller';

describe('ApiculteurController', () => {
  let controller: ApiculteurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiculteurController],
    }).compile();

    controller = module.get<ApiculteurController>(ApiculteurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
