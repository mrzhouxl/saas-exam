import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Exam } from 'libs/db/models/exam.model';
import { InjectModel } from 'nestjs-typegoose';
import * as _ from 'lodash';
import { Result } from '@app/common/result';

@Injectable()
export class ExamService {
  constructor(
    @InjectModel(Exam) private readonly model: ReturnModelType<typeof Exam>,
  ) { }

  /**
   * 处理并返回试卷的题目以及设置
   * @param id 需要处理的试卷id
   */
  public async processingReturnExamItem(id: string) {
    //查询试卷
    const exam = await this.model.findById(id).populate('exam_item').lean();
    const mergeItem = []; // 合并之后的item题目
    let examItem: Array<any> = exam.exam_item;
    // if (examItem.length === 0) {
    //   return Result.success(exam);
    // }
    const examOperation = exam.exam_optration;
    for (const item of examItem) {
      mergeItem.push({
        ...item,
        id: examOperation[item._id].id,
        score: examOperation[item._id].score,
        required: examOperation[item._id].required,
        score_method: examOperation[item._id].score_method,
      });
    }
    //添加非题库试题
    exam.exam_item = [...mergeItem, ...exam.unofficial_item];
    // exam.exam_item = _.orderBy(examItem, ['id'], ['asc'])
    return Result.success(exam);
  }
}
