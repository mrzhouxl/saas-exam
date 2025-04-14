import { Controller } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { DynamicDb } from 'libs/db/models/dynamic_db.model';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: DynamicDb
})
@Controller('dynamic-db')
export class DynamicDbController {
  constructor(
    @InjectModel(DynamicDb)
    private readonly model: ReturnModelType<typeof DynamicDb>
  ) { }
}
