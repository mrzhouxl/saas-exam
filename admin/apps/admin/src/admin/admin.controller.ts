import { Controller, Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReturnModelType } from '@typegoose/typegoose';
import { AdminUser } from 'libs/db/models/admin.model';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model:AdminUser
})
@Controller('admin')
@UseGuards(AuthGuard('jwt'))
export class AdminController {
  constructor(
    @InjectModel(AdminUser) private readonly model:ReturnModelType<typeof AdminUser>
  ){}
}
