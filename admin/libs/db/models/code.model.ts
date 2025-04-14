import { prop } from "@typegoose/typegoose";
import { BaseModel } from "./base.model";

export class Code extends BaseModel{
  
  @prop()
  mobile:string;

  @prop()
  code: number;

  @prop({
    type:String
  })
  message:string;
}