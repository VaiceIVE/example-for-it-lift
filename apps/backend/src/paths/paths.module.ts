import { Module } from '@nestjs/common';
import { PathsService } from './paths.service';
import { PathsController } from './paths.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Path } from './entities/path.entity';
import { OwnedPath } from './entities/ownedPath.entity';
import { PathStep } from './entities/pathStep.entity';
import { PathStepContent } from './entities/pathStepContent.entity';
import { PathStepTag } from './entities/pathTag.entity';
import { UserModule } from '../user/user.module';
import { Speciality } from './entities/spaciality.entity';
import { CommunityModule } from '../community/community.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Path, OwnedPath, PathStep, PathStepContent, PathStepTag, Speciality]),
    UserModule,
    CommunityModule,
  ],
  controllers: [PathsController],
  providers: [PathsService],
  exports: [PathsService]
})
export class PathsModule {}
