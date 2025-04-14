import { Module } from '@nestjs/common';
import { ExamItemController } from './exam-item.controller';
import { ExamItemService } from './exam-item.service';

@Module({
  controllers: [ExamItemController],
  providers: [ExamItemService]
})
export class ExamItemModule {}
