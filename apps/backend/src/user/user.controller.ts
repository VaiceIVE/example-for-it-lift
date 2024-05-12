import { Body, Controller, Delete, Get, Logger, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthDto } from '../auth/dtos/auth.dto';
import { UserUpdateDto } from './dtos/userUpdate.dto';
import { AccessTokenGuard } from '../auth/accessToken.guard';
import { UniversityService } from './university.service';

@Controller('user')
export class UserController
{
    constructor(
        private uniService: UniversityService,
        private readonly userService: UserService
    ){}
    
    @Delete('uni/')
    public async removeUni(@Body() data: Record<string, any>)
    {
        return await this.userService.removeUni(data.userid, data.uniid)
    }

    @Get(':id/uni/')
    public async getUni(@Param('id') userid: number)
    {
        return await this.userService.get3uni(userid)
    }

    @Delete('dropall')
    public async dropAll()
    {
        return await this.userService.dropall()
    }

    @Delete(':userid')
    public async dropExact(@Param('userid') id: number)
    {
        return await this.userService.deleteOne(id)
    }

    @Post('placement')
    public async updatePlacement()
    {
        return await this.userService.updatePlacement()
    }

    @Post('uni/')
    public async addUni(@Body() data: Record<string, any>)
    {
        return await this.userService.addUni(data.userid, data.uniid)
    }

    

    @Get()
    public async getAll()
    {
        return await this.userService.getAll()
    }

    @Get(':userid/achievements')
    public async getAchievementsById(@Param('userid') userid: number)
    {
        return await this.userService.getAchievements(userid)
    }

    @Get(':userid')
    public async getOneById(@Param('userid') userid: number)
    {
        return await this.userService.getOneByNickname((await this.userService.getOneById(userid)).nickname)
    }

    @Post(':id')
    public async updateOneAdmined(@Body() userDto: UserUpdateDto, @Param('id')id: number)
    {
        return await this.userService.updateOne(id, userDto)
    }

    @UseGuards(AccessTokenGuard)
    @Post('')
    public async updateOne(@Body() userDto: UserUpdateDto, @Req() req)
    {
        return await this.userService.updateOne(req.user.sub, userDto)
    }    

    @UseGuards(AccessTokenGuard)
    @Delete('')
    public async deleteOne(@Req() req)
    {
        return await this.userService.deleteOne(req.user.sub)
    }
}
