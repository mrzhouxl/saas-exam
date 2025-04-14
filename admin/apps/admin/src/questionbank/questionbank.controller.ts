import { Result } from '@app/common/result';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { ExamGroup } from 'libs/db/models/exam_group.model';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { QuestionbankService } from './questionbank.service';

@Crud({
  model: ExamGroup,
  routes:{
    find:{
      where:{
        isDelete:false
      }
    }
  }
})
@Controller('questionbank')
export class QuestionbankController {
  constructor(
    @InjectModel(ExamGroup) private readonly model: ReturnModelType<typeof ExamGroup>,
    private readonly questionService: QuestionbankService
  ) { }

  @Post('delete_node')
  public async deleteNode(@Body('id') id) {
    let result = await this.questionService.deleteCategory(id);
    if (result.type === 'error') {
      return Result.result(0, result.data, '删除分类失败！')
    } else {
      return Result.result(0, result.data, '删除分类成功！')
    }
  }
}
