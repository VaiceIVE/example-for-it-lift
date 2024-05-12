import { Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { UserService } from '../user/user.service';
import { PathsModule } from '../paths/paths.module';
import { UserModule } from '../user/user.module';
import { Path } from '../database/entities-index';

@Module({
  imports:[
    TypeOrmModule.forFeature([Card, Path]),
    UserModule,
  ],
  controllers: [CommunityController],
  providers: [CommunityService],
  exports: [CommunityService]
})
export class CommunityModule {}
