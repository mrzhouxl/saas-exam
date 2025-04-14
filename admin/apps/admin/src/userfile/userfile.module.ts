import { Module } from '@nestjs/common';
import { UserfileController } from './userfile.controller';

@Module({
  controllers: [UserfileController]
})
export class UserfileModule {}
