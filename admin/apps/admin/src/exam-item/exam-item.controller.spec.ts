import { Test, TestingModule } from '@nestjs/testing';
import { ExamItemController } from './exam-item.controller';

describe('ExamItemController', () => {
  let controller: ExamItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamItemController],
    }).compile();

    controller = module.get<ExamItemController>(ExamItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
