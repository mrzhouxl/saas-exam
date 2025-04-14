import { Test, TestingModule } from '@nestjs/testing';
import { ExamItemService } from './exam-item.service';

describe('ExamItemService', () => {
  let service: ExamItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExamItemService],
    }).compile();

    service = module.get<ExamItemService>(ExamItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
