import { Module } from '@nestjs/common';
import { SocialsService } from './socials.service';
import { SocialsController } from './socials.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Social } from './entities/social.entity';
import { SocialUsers } from './entities/socialsUsers.entity';
import { UserModule } from '../user/user.module';
import { AccessTokenStrategy } from '../auth/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from '../auth/strategies/refreshToken.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([Social, SocialUsers]), UserModule],
  controllers: [SocialsController],
  providers: [SocialsService],
  exports: [SocialsService]
})
export class SocialsModule {}
