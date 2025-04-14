import { Result } from "@app/common/result";
import { Delete, Param } from "@nestjs/common";
import { ModelType } from "@typegoose/typegoose/lib/types";

export class BaseController {
  constructor(
    public readonly model: any
  ) { }
  @Delete(':id')
  async delete(@Param('id') id) {
    let res = await this.model.update({
      _id: id
    }, {
      isDelete: true
    },{
      new: true
    })
    if(res){
      return Result.success(true)
    }
  }
}