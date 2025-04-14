import { Result } from '@app/common/result';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsNotEmpty, isNotEmpty, MaxLength, MinLength } from 'class-validator';
import { CodeService } from './code.service';

class BodyDto {
  @IsNotEmpty({
    message: '请填写手机号码'
  })
  @MaxLength(11)
  @MinLength(11)
  mobile: number;
}

@Controller('code')
export class CodeController {

  constructor(
    private readonly codeService: CodeService
  ) { }

  @Post('getCode')
  public async getCode(@Body() body: BodyDto): Promise<Result> {
    const { mobile } = body;
    let { type } = await this.codeService.sendCode(mobile);
    if (type === 'success') {
      return Result.result('200', {}, '发送成功！')
    } else {
      return Result.result('500', {}, '失败')
    }
  }
}
