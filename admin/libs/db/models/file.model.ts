import { prop } from "@typegoose/typegoose";
import { BaseModel } from "./base.model";

export class UserFile extends BaseModel{

  @prop({
    type:String
  })
  filename:string;

  @prop({
    type:String
  })
  type:string;

  @prop({
    type:String
  })
  md5:string;

  @prop({
    type:String
  })
  baseUrl:string;

}