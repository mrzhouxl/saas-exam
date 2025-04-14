import { modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    id: true,
    toJSON: {
      getters: true,
      virtuals: true
    }
  }
})
export class BaseModel {

  @prop({
    default: false
  })
  isDelete: boolean;
}