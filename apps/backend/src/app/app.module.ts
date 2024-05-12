import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { AchievementModule } from '../achievement/achievement.module';
import { PathsModule } from '../paths/paths.module';
import { AnalyzeModule } from '../analyze/analyze.module';
import { CommunityModule } from '../community/community.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    AchievementModule,
    PathsModule,
    AnalyzeModule,
    CommunityModule,
    TypeOrmModule.forRoot(ormconfig as TypeOrmModuleOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
