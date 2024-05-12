import { BadRequestException, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Equal, EqualOperator, Repository } from 'typeorm';
import { UserUpdateDto } from './dtos/userUpdate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AchievementOwned } from '../database/entities-index';
import { VkUserDto } from '../auth/dtos/vk.user.dto';
import { CreateUserDto } from './dtos/createUser.dto';
import { UniversityService } from './university.service';

@Injectable()
export class UserService {
    constructor(
        private uniService: UniversityService,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(AchievementOwned)
        private readonly achievementOwnedRepository: Repository<AchievementOwned>,
    ){}

    public async save(user: User)
    {
        return await this.userRepository.save(user)
    }

    public async create(user: CreateUserDto | VkUserDto)
    {
        const newUser = this.userRepository.create(user)
        await this.userRepository.save(newUser)
        return newUser
    }

    public async getOneById(id: number)
    {
        const user = await this.userRepository.findOne({where:{id: id}, order: {paths: {path: {pathSteps: {step: 'ASC'}}}}})

        return await this.userRepository.findOne({where:{id: id}, order: {paths: {path: {pathSteps: {step: 'ASC'}}}}})
    }

    public async getAchievements(id: number)
    {
        return await this.achievementOwnedRepository.find({where: {user: Equal<number>(id)}, relations: {achievement: true}, select: {achievement: {image: false, id: true, name: true}}} )
    }

    public async getOneByUsername(username: string)
    {
        return await this.userRepository.findOne({where:{username: username}, order: {paths: {path: {pathSteps: {step: 'ASC'}}}}})
    }

    public async getOneByNickname(nickname: string)
    {
        return await this.userRepository.findOne({where:{nickname: nickname}, relations:{paths: true}, order: {paths: {path: {pathSteps: {step: 'ASC'}}}}})
    }

    public async getOneByNicknameWithPass(nickname: string)
    {
        return await this.userRepository.findOne({where:{nickname: nickname}, select: {
            avataruri: true,
            grade: true, 
            id: true, 
            password: true,
            role: true,
            rank: true,
            nickname: true,
            username: true,
            points: true,
            isAnalyzed: true,
            ratingPlacement: true,
            analysedPaths: true,
            paths: true,
            socials: true,
            universities: true,
            achievements: true,
            cards: true,    
        }})
    }

    public async addUni(userid: number, uniid: number)
    {
        let user = await this.userRepository.findOne({where: {id: userid}, relations: {universities: true}})
        const uni = await this.uniService.getOne(uniid)

        Logger.log(user.universities)

        if(user.universities)
        {
            if(!(user.universities.includes(uni)))
            {
                user.universities.push(uni)
            }
        }
        else
        {
            user.universities = [uni]
        }

        return await this.userRepository.save(user)
    }

    public async removeUni(userid: number, uniid: number)
    {
        let user = await this.userRepository.findOne({where: {id: userid}, relations: {universities: true}})

        if(user.universities)
        {

            user.universities = user.universities.filter((obj) => {return obj.id != uniid})
        }

        return await this.userRepository.save(user)
    }

    public async get3uni(userid: number)
    {
        return (await this.userRepository.findOne({where: {id: userid}, relations: {universities: true}, select: {universities: true}})).universities.slice(0, 3)
    }

    public async getAll()
    {
        return await this.userRepository.find({relations: {socials: {social: true}}})
    }

    public async updateOne(userid: number, userDto: UserUpdateDto)
    {
        let user = await this.getOneById(userid)
        Object.assign(user, userDto)
        return await this.userRepository.save(user)
    }

    public async updatePlacement()
    {
        const users = await this.userRepository.find({order: {points: 'DESC'}})
        let iteration = 1
        for(let user of users)
        {   
            user.ratingPlacement = iteration
            await this.userRepository.save(user)
            iteration += 1
        }
        return await this.userRepository.find({order: {points: 'DESC'}})
    }

    public async deleteOne(id: number)
    {
        let user = await this.userRepository.findOne({where: {id: id}, relations: {paths: true}})
        user.analysedPaths = []
        await this.userRepository.save(user)
        return await this.userRepository.delete({id: id})
    }

    async dropall()
    {
        return await this.userRepository.delete({})
    }
}
