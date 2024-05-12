import { Body, Controller, Delete, Get, Param, Post, StreamableFile, UploadedFile, UseInterceptors } from "@nestjs/common";
import { UniversityService } from "./university.service";
import { CreateUniDto } from "./dtos/createUni.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('university')
export class UniversityController
{
    constructor(
        private readonly uniService: UniversityService
    ){}
    
    @Delete('dropall')
    public async dropAll()
    {
        return await this.uniService.dropall()
    }

    @Delete('droptags')
    public async dropTags()
    {
        return await this.uniService.droptags()
    }

    @Post('tags/:id')
    async changeTags(@Param('id') uniid: number, @Body() data: Record<string, any>)
    {
        return await this.uniService.addTags(uniid, data.tags)
    }

    @Post()
    @UseInterceptors(FileInterceptor('file'))
    create(@Body() createUniDto: CreateUniDto, @UploadedFile() file: Express.Multer.File) {
        return this.uniService.create({...createUniDto, imageBuff: file.buffer});
    }

    @Get()
    public async getAll()
    {
        return await this.uniService.getAll()
    }

    @Get('image/:id')
    public async getOneImage(@Param('id') id: number)
    {
        return new StreamableFile(await this.uniService.getImage(id))
    }

    @Delete(':id')
    public async deleteOneById(@Param('id')id: number)
    {
        return await this.uniService.deleteById(id)
    }
}