import { Module } from '@nestjs/common';
import { AchievementController } from './achievement.controller';
import { AchievementService } from './achievement.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Achievement } from './entities/achievement.entity';
import { AchievementOwned } from './entities/achievementOwned.entity';
import { User } from '../database/entities-index';

@Module({
    imports: [TypeOrmModule.forFeature([Achievement, AchievementOwned, User])],
    controllers: [AchievementController],
    providers: [AchievementService]
})
export class AchievementModule {}
