import { prop } from "@typegoose/typegoose";
import { BaseModel } from "./base.model";

export class Oauth extends BaseModel {
  @prop({ type: String })
  type: string;

  @prop({ type: String })
  openid: string;

  @prop({ type: String })
  mobile: string;

  @prop({ type: String })
  nickname: string;

  @prop({ type: String })
  avatar: string;

  @prop()
  data: any;
}