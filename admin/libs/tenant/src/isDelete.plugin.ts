import { Schema } from "mongoose";

export const isDelete = (schema: Schema, options: any) => {
  schema.add({
    isDelete: Boolean
  })

  schema.pre('save', function (next) {
    this.isDelete = false
    next()
  })

  schema.pre('find', function (next) {
    this.where({
      ...this.where,
      'isDelete': false
    })
    next()
  })

}