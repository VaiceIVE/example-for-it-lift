import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, StreamableFile, UseGuards, Req, Query } from '@nestjs/common';
import { SocialsService } from './socials.service';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { CreateUsersSocialDto } from './dto/create-users-social.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccessTokenGuard } from '../auth/accessToken.guard';

@Controller('socials')
export class SocialsController {
  constructor(private readonly socialsService: SocialsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createAchievementDto: CreateSocialDto, @UploadedFile() file: Express.Multer.File) {
    return this.socialsService.create({...createAchievementDto, imagebuff: file.buffer});
  }

  @Get('image/:id')
  async getImage(@Param('id')id: number)
  {
    return new StreamableFile(await this.socialsService.getImage(id))
  }

  @UseGuards(AccessTokenGuard)
  @Post('vk')
  async attachVk(@Query('silent_token') silentToken: string, @Query('uuid') uuid: string, @Req() req: Record<string, any>)
  {
    return await this.socialsService.attachVk(silentToken, uuid, req.user.sub)
  }

  @Post('user')
  async createUsersSocial(@Body() createUsersSocialDto: CreateUsersSocialDto) {
    await this.socialsService.addUsersSocial(createUsersSocialDto);
    return this.socialsService.findAllByUserId(createUsersSocialDto.userid)
  }
  @Get()
  findAll() {
    return this.socialsService.findAll();
  }

  @Delete('user/')
  removeUserSocial(@Body() dto: CreateUsersSocialDto) {
    return this.socialsService.removeUsersSocials(dto.userid, dto.socialname);
  }

  @Delete('user/:id')
  removeUserSocialByUser(@Param('id') id: string) {
    return this.socialsService.removeUsersSocialsByUserId(+id);
  }  

  @Get('user/:id')
  findUser(@Param('id') id: number) {
    return this.socialsService.findAllByUserId(id);
  }

  @Get('users')
  findAllUsers() {
    return this.socialsService.getAllUsersSocial();
  }

  @Post('init')
  intitalize() {
    return this.socialsService.initialize();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialsService.findOne(+id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateSocialDto: UpdateSocialDto) {
    return this.socialsService.update(+id, updateSocialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialsService.remove(+id);
  }
}
