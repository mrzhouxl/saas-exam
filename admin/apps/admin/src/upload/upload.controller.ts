import { Result } from '@app/common/result';
import { Body, Controller, HttpCode, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReturnModelType } from '@typegoose/typegoose';
import { UserFile } from 'libs/db/models/file.model';
import { InjectModel } from 'nestjs-typegoose';
import { Readable } from 'stream';
import { UploadService } from './upload.service';
const qiniu = require("qiniu");
@Controller('upload')
export class UploadController {
  constructor(
    @InjectModel(UserFile) private readonly userFileModel: ReturnModelType<typeof UserFile>
  ) { }

  @Post('token')
  uptoken() {
    const options = {
      scope: process.env.QINIUSCOPE,
    };
    const filename = new Date().getTime() + '.png'
    //初始化
    var mac = new qiniu.auth.digest.Mac(process.env.QINIUKEY, process.env.uPqkLONYzWG5x74m1XjFmlEhYn5fcQZIXyQsUJN4);
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac)
    return Result.success({ token: uploadToken, filename });
  }

  @Post('saveImg')
  async saveImg(@Body() body) {
    const { url } = body;
    const img = await this.userFileModel.create({
      type: 'image',
      // filename:url.split('/')
      baseUrl: url
    })
    if (img) {
      return Result.success('上传成功')
    } else {
      return Result.error('上传异常')
    }
  }

  async uploadToOSS(file: any) {
    const readable = new Readable();
    readable._read = () => { };
    readable.push(file.buffer);
    readable.push(null);
    return readable
    // 将可读流中的数据上传到云存储服务中
    // TODO: 上传逻辑
  }

  @Post('img')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file, @Body() body) {
    const { type } = body
    const options = {
      scope: 'blogzxl',
      expires: 7200,
    };
    const filename = new Date().getTime() + '.' + file.originalname.split('.').slice(-1);
    //初始化
    var mac = new qiniu.auth.digest.Mac(process.env.QINIUKEY, process.env.QINIUSECRET);
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    var config = new qiniu.conf.Config();
    config.zone = qiniu.zone.Zone_z2;
    const formUploader = new qiniu.form_up.FormUploader(config);
    // 将上传的文件转换为可读流
    const stream = await this.uploadToOSS(file);
    var putExtra = new qiniu.form_up.PutExtra();
    const res: any = await new Promise((resolve, reject) => {
      formUploader.putStream(uploadToken, filename, stream, putExtra, (respErr,
        respBody, respInfo) => {
        if (respErr) {
          reject(respErr);
        }
        if (respInfo.statusCode == 200) {
          resolve(respBody)
        } else {
          console.log(respInfo.statusCode);
          console.log(respBody);
        }
      });
    })
    // 改成oss的文件路径
    const url = '' + res.key
    // 保存文件
    const img = await this.userFileModel.create({
      type: type || 'image',
      // filename:url.split('/')
      baseUrl: url
    })
    return Result.success({
      // 改成oss的文件路径
      file: '' + res.key,
      filename: res.key,
      status: true
    })
  }
}
