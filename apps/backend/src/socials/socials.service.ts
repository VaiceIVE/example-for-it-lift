import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { CreateSocialDto } from './dto/create-social.dto';
import { UpdateSocialDto } from './dto/update-social.dto';
import { Social } from './entities/social.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, FindOperator, Repository } from 'typeorm';
import { UserRolesGuard } from '../user/user.guard';
import { Roles } from '../decorators/roles.decorator';
import { SocialUsers } from './entities/socialsUsers.entity';
import { UserService } from '../user/user.service';
import { CreateUsersSocialDto } from './dto/create-users-social.dto';
import { AccessTokenGuard } from '../auth/accessToken.guard';
import axios from 'axios';
import { TokenExpiredOrInvalidException } from '../exceptions/tokenExpired.exception';
import clientdata from '../constants/clientdata';

@Injectable()
export class SocialsService {
  constructor(
    private userService: UserService,
    @InjectRepository(Social)
    private socialsRepository: Repository<Social>,
    @InjectRepository(SocialUsers)
    private socialsUsersRepository: Repository<SocialUsers>
  ){}

  async create(createSocialDto: CreateSocialDto) {
    Logger.log(createSocialDto)
    let social = await this.socialsRepository.create(createSocialDto)
    await this.socialsRepository.save(social);
    social.image = `https://api.adera-team.ru/socials/image/${social.id}`
    return await this.socialsRepository.save(social)
  }

  async getImage(id: number)
  {
    return (await this.socialsRepository.findOne({where: {id: id}, select: {imagebuff: true}})).imagebuff
  }

  async initialize()
  {
    await this.socialsRepository.insert({name: 'VK', description: 'Сообщества, записи на стене, комментарии'})
    await this.socialsRepository.insert({name: 'LeaderID', description: 'Мероприятия, команды'})
    await this.socialsRepository.insert({name: 'Steam', description: 'Игры, сообщества'})
    return 'ok'
  }

  async upsert()
  {
    this.socialsRepository.upsert({name: 'VK', description: 'Сообщества, записи на стене, комментарии'}, {conflictPaths: ["name"]})
  }

  async findAll() {
    return await this.socialsRepository.find();
  }

  async findLinksByUserId(id: number) {
    return await this.socialsUsersRepository.find({where: {user: {id: id}}, relations: {social: true}});
  }

  async findSocialByName(name: string) {
    return await this.socialsRepository.findOneBy({name: name})
  }

  async getAllUsersSocial()
  {
    return await this.socialsUsersRepository.find({relations: {social: true, user: true}})
  }

  async findOneByUserId(socialname: string, originalid: string)
  {
    return await this.socialsUsersRepository.findOne({where: {originaluserid: originalid, social: {name: socialname}}, relations:{user: true, social: true}})
  }

  async findAllByUserId(userid: number)
  {
    const userSocials = await this.socialsUsersRepository.find({where: {user: Equal<number>(userid)}, relations:{user: false, social: true}, select:{id: false, originaluserid: false}})
    const socials = await this.socialsRepository.find({select: {description: true, id: true, image: true, name: true}})
    let pureSocials = []
    for (const socialConnect of userSocials)
    {
      pureSocials.push(socialConnect.social.name)
    }
    let ans = {socials: []}
    for (const social of socials)
    {
      if (pureSocials.includes(social.name))
      {
        ans.socials.push({...social, status: 'connected'})
      }
      else
      {
        ans.socials.push({...social, status: 'avalible'})
      }
    }
    return ans
  }

  async findOne(id: number) {
    return await this.socialsRepository.findOneBy({id: id});
  }

  async attachVk(silentToken: string, uuid: string, userid: number)
  {
    Logger.log("VKATTACHING")

    const accessuri = `https://api.vk.com/method/auth.exchangeSilentAuthToken?v=5.131&access_token=${clientdata.service_token}&token=${silentToken}&uuid=${uuid}`

    const result = await axios.get(accessuri)

    if (result.data.error)
    {
      throw new TokenExpiredOrInvalidException()
    }

    const datauri = `https://api.vk.com/method/account.getProfileInfo?v=5.131&access_token=${result.data.response.access_token}`

    const userData = await (await axios.get(datauri)).data.response

    return await this.addUsersSocial({originaluserid: userData.id, socialname: "VK", userid: userid})
  } 

  async addUsersSocial(createUsersSocialDto: CreateUsersSocialDto)
  {
    const newUser = await this.socialsUsersRepository.create(
      {
        originaluserid: createUsersSocialDto.originaluserid, 
        social: await this.socialsRepository.findOneBy({name: createUsersSocialDto.socialname}), 
        user: await this.userService.getOneById(createUsersSocialDto.userid)
      }
      )
    return await this.socialsUsersRepository.save(newUser)
  }

  async removeUsersSocialsByUserId(id: number)
  {
    return this.socialsUsersRepository.delete({user: {id: id}})
  }

  async removeUsersSocials(id: number, socialname: string)
  {
    return this.socialsUsersRepository.delete({user: {id: id}, social: {name: socialname}})
  }

  @UseGuards(UserRolesGuard)
  @Roles('admin')
  async update(id: number, updateSocialDto: UpdateSocialDto) {
    return await this.socialsRepository.update(id, updateSocialDto);
  }


  async remove(id: number) {
    return await this.socialsRepository.delete({id: id});
  }
}
