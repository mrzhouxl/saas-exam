import { InjectBaseModel } from '@app/tenant/inject-base-model';
import { Controller } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { Tenant } from 'libs/db/models/tenant.model';
import { Crud } from 'nestjs-mongoose-crud';

@Crud({
  model: Tenant
})
@Controller('tenants')
export class TenantsController {
  constructor(@InjectBaseModel(Tenant) private readonly model: ReturnModelType<typeof Tenant>) { }

}
