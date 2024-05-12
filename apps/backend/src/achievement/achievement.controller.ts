import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Logger, StreamableFile, UseGuards } from '@nestjs/common';
import { AchievementService } from './achievement.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Multer } from 'multer';
import { CreateAchievementOwnedDto } from './dto/create-achievementOwned.dto';
import { UserRolesGuard } from '../user/user.guard';
import { Roles } from '../decorators/roles.decorator';

@Controller('achievement')
export class AchievementController {
  constructor(private readonly achievementService: AchievementService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@Body() createAchievementDto: CreateAchievementDto, @UploadedFile() file: Express.Multer.File) {
    return this.achievementService.create({...createAchievementDto, image: file.buffer});
  }

  @Post('owned')
  createOwned(@Body() createAchievementOwnedDto: CreateAchievementOwnedDto) {
    return this.achievementService.createOwned(createAchievementOwnedDto);
  }

  @Delete('owned')
  deleteOwned(@Body() deleteAchievementOwnedDto: CreateAchievementOwnedDto) {
    return this.achievementService.deleteOwned(deleteAchievementOwnedDto);
  }
  @Get()
  findAll() {
    return this.achievementService.findAll();
  }

  @Get('/image/:id')
  async findOneImage(@Param('id') id: string) {
    return new StreamableFile((await this.achievementService.findOneImage(+id)));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.achievementService.findOne(+id);
  }

  @UseGuards(UserRolesGuard)
  @Roles('admin')
  @Post(':id')
  update(@Param('id') id: string, @Body() updateAchievementDto: UpdateAchievementDto) {
    return this.achievementService.update(+id, updateAchievementDto);
  }

  @UseGuards(UserRolesGuard)
  @Roles('admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.achievementService.remove(+id);
  }
}
