import { Body, Controller, Post } from '@nestjs/common';
import { UploadService } from '../upload/upload.service';
@Controller('clockIn')
export class ClockInController {
  constructor(
    private readonly uploadService: UploadService
  ){}
}
