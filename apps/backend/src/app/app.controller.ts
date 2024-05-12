import { Controller, Get, StreamableFile } from '@nestjs/common';

import { AppService } from './app.service';
import { ReadStream } from 'typeorm/platform/PlatformTools';
import { createReadStream } from 'fs';
import { join } from 'path';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Get('agreement')
  agreement()
  {
    return new StreamableFile(createReadStream(join(process.cwd(),'apps/backend/src/constants/useragreement.pdf')))
  }

  @Get('confidentiality')
  confidentiality()
  {
    return new StreamableFile(createReadStream(join(process.cwd(),'apps/backend/src/constants/confidentiality.pdf')))
  }
}
