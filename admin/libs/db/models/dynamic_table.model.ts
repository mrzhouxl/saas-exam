import { prop } from "@typegoose/typegoose";
import { BaseModel } from "./base.model";

export enum DataType {

}
interface Property {
  name: string;
  title: string;
  dataType: string;
  require: boolean;
  default: string;
  search: boolean;
}
export class DynamicTable extends BaseModel {

  @prop()
  tableName: string;

  @prop()
  name: string;

  @prop()
  describe: string;

  @prop({
    type: Array<Property>
  })
  tableProperty: Array<Property>
}