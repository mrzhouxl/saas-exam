import { prop } from "@typegoose/typegoose";
import { BaseModel } from "./base.model";

enum ReserveEnum {
    
}


export class Reserve extends BaseModel{
  
  @prop()
  name:string;

  @prop()
  location:string;

  @prop()
  type:ReserveEnum;
}