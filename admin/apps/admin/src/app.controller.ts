import { BadRequestException, Body, Controller, Get, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';
import { Buffer } from 'buffer'
import { InjectModel } from 'nestjs-typegoose';
import { UserFile } from 'libs/db/models/file.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(
    @InjectModel(UserFile)private readonly userFileModel: ReturnModelType<typeof UserFile>,
    private readonly appService: AppService
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor("file"))
  async upload(@UploadedFiles() files, @Body() body) {
    console.log(files)
    const writeImage = createWriteStream(join(__dirname, '..', 'upload', `${files[0].originalname}`))
    writeImage.write(files[0].buffer, async (error) => {
      if (error) {
        throw new BadRequestException()
      } else {
        let buf = new Buffer(files[0].buffer);
        var str = buf.toString("binary");
        var crypto = require("crypto");
        let md5 = crypto.createHash("md5WithRSAEncryption").update(str).digest("hex");
        await this.userFileModel.create({
          filename:files[0].originalname,
          type:files[0].mimetype,
          md5,
          baseUrl:'/'
        })
      }
    })
  }
}
