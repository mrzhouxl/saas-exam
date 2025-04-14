import { DocumentType, Pre, prop, Ref, ReturnModelType } from "@typegoose/typegoose";
import { BaseModel } from "./base.model";
import { ExamGroup } from "./exam_group.model";
import { ExamItem } from "./exam_item.model";

@Pre('save', () => {

})
//试卷
export class Exam extends BaseModel {

  /**
   * 试卷名称
   */
  @prop({
    type: String
  })
  title: string;
  /**
   * 试卷类型
   */
  @prop({
    type: String
  })
  type: string;

  /**
   * 试卷封面
   */
  @prop({
    type: String
  })
  image: string;

  /**
   * 试卷介绍
   */
  @prop({
    type: String
  })
  describe: string;

  /**是否公开 */
  @prop({
    type: Number
  })
  is_public: number;

  /**白名单 */
  @prop({
    type: Array<string>
  })
  white_list: Array<string>

  /**答题时间 */
  @prop({
    type: Date
  })
  time: Date

  /**结束时间 */
  @prop({
    type: Date
  })
  end_time: Date

  @prop({
    ref: "ExamItem",
    type: Array<ExamItem>
  })
  exam_item: Ref<ExamItem>[]

  // 单个题目的配置信息
  @prop()
  exam_optration: any

  @prop({
    type: Array
  })
  unofficial_item: Array<any>

  // 试题数量
  get examNumber() {
    return Number(this.exam_item.length) + Number(this.unofficial_item.length)
  }

}