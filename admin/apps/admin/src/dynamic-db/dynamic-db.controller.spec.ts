import { Test, TestingModule } from '@nestjs/testing';
import { DynamicDbController } from './dynamic-db.controller';

describe('DynamicDbController', () => {
  let controller: DynamicDbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DynamicDbController],
    }).compile();

    controller = module.get<DynamicDbController>(DynamicDbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
