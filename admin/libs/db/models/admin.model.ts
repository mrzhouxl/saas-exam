import { prop, Ref } from "@typegoose/typegoose";
import { BaseModel } from "./base.model";
import { Tenant } from "./tenant.model";

export class AdminUser extends BaseModel {
  @prop({
    type: String
  })
  username: string;

  @prop({
    type: String
  })
  password: string;

  @prop()
  mobile: string;

  @prop({
    type: String
  })
  email: string;

  @prop()
  auth: Array<string>[]

  @prop({
    ref: Tenant
  })
  tenant: Ref<Tenant>

  @prop({
    default:false
  })
  isDelete: boolean;
}