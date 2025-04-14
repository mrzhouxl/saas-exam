import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "./base.model";
import { ExamGroup } from "./exam_group.model";

@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Option {

  @prop()
  label: string;
  @prop()
  value?: string;
}


//试卷
export class ExamItem extends BaseModel {

  /**
   * 名称
   */
  @prop({
    type: String
  })
  title: string;

  @prop()
  name: string;

  /**
   * 类型
   */
  @prop({
    type: String
  })
  type: string;

  @prop()
  icon: string;
  
  //所属分组
  @prop({
    ref: 'ExamGroup'
  })
  group: Ref<ExamGroup>

  // 量表数量
  @prop()
  min: number;

  @prop()
  max: number;


  @prop()
  maxText: string;

  @prop()
  minText: string;

  //答案
  @prop({
    type: String
  })
  answer: string;

  //解析
  @prop({
    type: String
  })
  analysis: string;

  //题目选项
  @prop({
    type: Option
  })
  options: Option[];

  /**
   * 难度级别
   */
  @prop()
  difficulty: string

  @prop({
    type: String
  })
  md5: string;
}