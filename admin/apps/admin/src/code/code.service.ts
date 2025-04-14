import { Result } from '@app/common/result';
import { InjectBaseModel } from '@app/tenant/inject-base-model';
import { Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { AnyAaaaRecord } from 'dns';
import { Code } from 'libs/db/models/code.model';

@Injectable()
export class CodeService {
  constructor(
    @InjectBaseModel(Code) private code:ReturnModelType<typeof Code>
  ){}

  public async sendCode(mobile:number){
    let random = Math.floor(Math.random() * 10000);
    // 创建code信息
    let code = await this.code.create({
      mobile,
      code: random,
      message: random!=null?'code生成成功':'code生成失败'
    })
    return Result.success(code)
  }
}
