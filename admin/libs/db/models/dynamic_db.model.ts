import { Ref, modelOptions, prop } from "@typegoose/typegoose";
import { BaseModel } from "./base.model";
import { DynamicTable } from "./dynamic_table.model";

@modelOptions({
  schemaOptions: {
    strict: false
  }
})
export class DynamicDb extends BaseModel {

  @prop({
    ref: 'DynamicTable'
  })
  tablePreset: Ref<DynamicTable>
}