import { Result } from '@app/common/result';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Exam } from 'libs/db/models/exam.model';
import { ExamGroup } from 'libs/db/models/exam_group.model';
import { ExamItem } from 'libs/db/models/exam_item.model';
import mongoose from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';

@Injectable()
export class QuestionbankService {
  constructor(
    @InjectModel(ExamGroup) private readonly model: ReturnModelType<typeof ExamGroup>,
    @InjectModel(Exam) private readonly examModel: ReturnModelType<typeof Exam>,
    @InjectModel(ExamItem) private readonly examitemModel: ReturnModelType<typeof ExamItem>
  ) { }

  /**
   * 添加题库
   */
  public async addQuestionBank(title: string, parent?: string) {
    let res = await this.model.create({
      title,
      parent: parent ?? null
    })
    return Result.success(res)
  }

  /**
   * 删除题库
   * @pamary
   */
  public async deleteCategory(id: string) {
    let exam = await this.examitemModel.find({
      group: new mongoose.Types.ObjectId(id)
    })

    //当前节点下面有题目，不能删除
    if (exam.length > 0) {
      return Result.error('当前分类有试题，不能删除！')
    } else {
      let exam = await this.model.findByIdAndUpdate(id, { isDelete: true }, { new: true });
      console.log(exam)
      if (exam && exam.isDelete) {
        return Result.success(true)
      } else {
        return Result.success(false)
      }
    }
  }
}
