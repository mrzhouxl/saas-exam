import { Controller } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { DynamicTable } from 'libs/db/models/dynamic_table.model';
import { Crud } from 'nestjs-mongoose-crud';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: DynamicTable
})
@Controller('dynamic-table')
export class DynamicTableController {
  constructor(
    @InjectModel(DynamicTable) private readonly model: ReturnModelType<typeof DynamicTable>
  ) { }
}
