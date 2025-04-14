import { Result } from '@app/common/result';
import { Body, Controller, HttpException, Post, Query, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import { Exam } from 'libs/db/models/exam.model';
import { ExamItem } from 'libs/db/models/exam_item.model';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { ExamItemService } from './exam-item.service';
@Crud({
  model: Exam
})
@Controller('exam-item')
export class ExamItemController {
  constructor(
    @InjectModel(ExamItem) private readonly model: ReturnModelType<typeof ExamItem>,
    private readonly examItemService: ExamItemService
  ) { }

  @Post('/importWord')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file, @Req() req, @Query() query, @Body() body) {
    let { title, id, sortId } = body
    if (!file) {
      throw new HttpException('请先上传文件', 400);
    }
    //判断是否是docx文件类型 值支持docx文件类型
    const fileType = file.originalname.split('.')[1]
    if (fileType != 'docx') {
      throw new HttpException('请先确认文件上传类型是否正确，只支持docx的文件类型', 400)
    }
    let result = await this.examItemService.importWord(file, sortId, id)
    if (result.type) {
      return Result.result(200, true, '上传成功')
    } else {
      return Result.result(1001, true, '操作异常，请检查')
    }
  }
}
