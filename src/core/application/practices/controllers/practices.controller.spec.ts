import { Test, TestingModule } from '@nestjs/testing';
import { PracticesController } from './practices.controller';

describe('Practices Controller', () => {
  let controller: PracticesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PracticesController],
    }).compile();

    controller = module.get<PracticesController>(PracticesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
