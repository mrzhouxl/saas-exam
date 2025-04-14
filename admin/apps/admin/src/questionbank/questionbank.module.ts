import { Module } from '@nestjs/common';
import { QuestionbankController } from './questionbank.controller';
import { QuestionbankService } from './questionbank.service';

@Module({
  controllers: [QuestionbankController],
  providers: [QuestionbankService]
})
export class QuestionbankModule {}
