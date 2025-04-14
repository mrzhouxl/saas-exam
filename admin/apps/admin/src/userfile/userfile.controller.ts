import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { UserFile } from 'libs/db/models/file.model';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';
import { BaseController } from '../BaseController';

@Crud({
  model: UserFile
})
@UseGuards(AuthGuard('jwt'))
@Controller('userfile')
export class UserfileController extends BaseController {
  constructor(
    @InjectModel(UserFile) public readonly model: ReturnModelType<typeof UserFile>
  ) {
    super(model);
  }
}
