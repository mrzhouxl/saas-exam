import { Result } from '@app/common/result';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { Exam } from 'libs/db/models/exam.model';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { ExamService } from './exam.service';

@Crud({
  model: Exam,
})
@UseGuards(AuthGuard('jwt'))
@Controller('exam')
export class ExamController {
  constructor(
    @InjectModel(Exam) private readonly model: ReturnModelType<typeof Exam>,
    private readonly examService: ExamService,
  ) {}

  @Get('find_exam/:id')
  public async getExam(@Param('id') id: string) {
    const res = await this.examService.processingReturnExamItem(id);
    return Result.result(200, res.data, '查询试卷');
  }
}
