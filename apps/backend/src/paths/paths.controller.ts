import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PathsService } from './paths.service';
import { CreatePathDto } from './dto/create-path.dto';
import { UpdatePathDto } from './dto/update-path.dto';
import { CreateMultiplePathDto } from './dto/create-multiple-path.dto';
import { CreateOwnedPathDto } from './dto/create-owned-path.dto';
import { CreateAnalyzedPathDto } from './dto/create-analyzed-path.dto';

@Controller('paths')
export class PathsController {
  constructor(private readonly pathsService: PathsService) {}

  @Post()
  create(@Body() createPathDto: CreatePathDto) {
    return this.pathsService.create(createPathDto);
  }

  @Post('owned')
  createOwnedPath(@Body() createPathDto: CreateOwnedPathDto) {
    return this.pathsService.createOwnage(createPathDto);
  }

  @Post('progress/:pathid')
  progressPath(@Param('pathid') id: number) {
    return this.pathsService.stepProgress(id);
  }

  @Post('multiple')
  createMultiple(@Body() createPathDto: CreateMultiplePathDto) {
    return this.pathsService.createMultiple(createPathDto);
  }

  @Get('fakeanalyze')
  find3() {
    return this.pathsService.find3();
  }

  @Get()
  findAll() {
    return this.pathsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pathsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePathDto: UpdatePathDto) {
   // return this.pathsService.update(+id, updatePathDto);
  }

  @Delete('user/:id')
  removeFromUser(@Param('id') id: string) {
    return this.pathsService.dropOwnageForUser(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pathsService.remove(+id);
  }

  @Delete('')
  removeAll(@Param('id') id: string) {
    return this.pathsService.removeAll();
  }
}
