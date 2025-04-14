import { Module } from '@nestjs/common';
import { ClockInController } from './clock-in.controller';
import { UploadService } from '../upload/upload.service';

@Module({
  controllers: [ClockInController],
  providers: [UploadService]
})
export class ClockInModule { }
