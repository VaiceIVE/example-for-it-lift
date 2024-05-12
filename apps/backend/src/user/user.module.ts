import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { databaseProvider } from '../providers/database.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AchievementOwned, Univercity } from '../database/entities-index';
import { UniversityController } from './university.controller';
import { UniversityService } from './university.service';
import { UniTag } from './entities/uniTag.entity';

@Module({
        imports:[TypeOrmModule.forFeature([User, AchievementOwned, Univercity, UniTag])],
        controllers: [UserController, UniversityController],
        providers: [UserService, databaseProvider, UniversityService],
        exports: [UserService]
    })
export class UserModule {}
