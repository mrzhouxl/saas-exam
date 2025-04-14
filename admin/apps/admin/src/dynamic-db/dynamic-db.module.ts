import { Module } from '@nestjs/common';
import { DynamicDbController } from './dynamic-db.controller';

@Module({
  controllers: [DynamicDbController]
})
export class DynamicDbModule {}
