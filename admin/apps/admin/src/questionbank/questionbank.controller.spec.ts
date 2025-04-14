import { Test, TestingModule } from '@nestjs/testing';
import { QuestionbankController } from './questionbank.controller';

describe('QuestionbankController', () => {
  let controller: QuestionbankController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionbankController],
    }).compile();

    controller = module.get<QuestionbankController>(QuestionbankController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
