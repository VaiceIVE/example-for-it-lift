import { Module } from '@nestjs/common';
import { AnalyzeService } from './analyze.service';
import { AnalyzeController } from './analyze.controller';
import { UserModule } from '../user/user.module';
import { SocialsModule } from '../socials/socials.module';
import { PathsModule } from '../paths/paths.module';

@Module({
  imports: [UserModule, SocialsModule, PathsModule],
  controllers: [AnalyzeController],
  providers: [AnalyzeService],
})
export class AnalyzeModule {}
