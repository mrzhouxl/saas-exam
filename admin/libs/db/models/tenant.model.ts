import { prop } from "@typegoose/typegoose";
import { BaseModel } from "./base.model";

export class Tenant extends BaseModel{
  @prop({type:String})
  key:string;//学院key

  @prop({
    type:String
  })
  balance:string;//学院 balance

  @prop({
    type:String
  })
  mobile:string

  @prop({type:String})
  share:string;

  @prop({
    default:false
  })
  isDelete: boolean;
}