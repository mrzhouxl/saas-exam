import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "./base.model";


//题库分组
@modelOptions({
  schemaOptions:{
    toJSON: {
      virtuals: true,
      getters: true,
    }
  }
})
export class ExamGroup extends BaseModel {

  @prop({
    type: String
  })
  title: string;

  //上级分组
  @prop({
    ref: ExamGroup
  })
  parent: Ref<ExamGroup>

  @prop({ ref: 'ExamGroup', foreignField: 'parent', localField: '_id', as: 'children' })
  children?: Ref<ExamGroup>[]

  get label(){
    return this.title
  }

}