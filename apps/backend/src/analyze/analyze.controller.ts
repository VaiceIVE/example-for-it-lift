import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AnalyzeService } from './analyze.service';
import { AccessTokenGuard } from '../auth/accessToken.guard';
import { UserService } from '../user/user.service';
import { SocialsService } from '../socials/socials.service';

@Controller('analyze')
export class AnalyzeController {
  constructor(
    private readonly analyzeService: AnalyzeService,
    ) {}

  @UseGuards(AccessTokenGuard)
  @Get()
  public async analyze(@Req() req: Record<string, any>)
  {

    return this.analyzeService.analyzeUserById(req.user.sub)

    
  }

  @UseGuards(AccessTokenGuard)
  @Get('mock')
  public async analyzeMock(@Req() req: Record<string, any>)
  {

    return this.analyzeService.mockAnalyze(req.user.sub)

    
  }
}
