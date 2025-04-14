import { DbModule } from '@app/db';
import { TenantModule } from '@app/tenant';
import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';

@Global()
@Module({
  imports:[DbModule,TenantModule],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
