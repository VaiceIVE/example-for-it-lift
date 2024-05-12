import { Injectable, Logger } from '@nestjs/common';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Achievement } from './entities/achievement.entity';
import { Equal, Repository } from 'typeorm';
import { AchievementOwned } from './entities/achievementOwned.entity';
import { User } from '../database/entities-index';
import { CreateAchievementOwnedDto } from './dto/create-achievementOwned.dto';
import { DuplicateException } from '../exceptions/duplicateValue.exception';

@Injectable()
export class AchievementService {
  constructor(
    @InjectRepository(Achievement)
    private readonly achievementRepository: Repository<Achievement>,
    @InjectRepository(AchievementOwned)
    private readonly achievementOwnedRepository: Repository<AchievementOwned>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ){}

  async create(createAchievementDto: CreateAchievementDto) {
    const achievement = this.achievementRepository.create({...createAchievementDto})
    return await this.achievementRepository.save(achievement)
  }

  async createOwned(createAchievementOwnedDto: CreateAchievementOwnedDto) {
    if (await this.achievementOwnedRepository.findOneBy({
      user: Equal<number>(createAchievementOwnedDto.userid), 
      achievement: Equal<number>(createAchievementOwnedDto.achievementid)
    }))
      {
        throw new DuplicateException()
      }
    const achievement = this.achievementOwnedRepository.create({
      user: await this.userRepository.findOneBy({id: createAchievementOwnedDto.userid}), 
      achievement: await this.achievementRepository.findOneBy({id: createAchievementOwnedDto.achievementid}),
    })
    return await this.achievementOwnedRepository.save(achievement)
  }

  async deleteOwned(createAchievementOwnedDto: CreateAchievementOwnedDto) {
    return this.achievementOwnedRepository.delete({
      user: Equal<User>(await this.userRepository.findOneBy({id: createAchievementOwnedDto.userid})), 
      achievement: Equal<Achievement>(await this.achievementRepository.findOneBy({id: createAchievementOwnedDto.achievementid})),
    })
  }

  async findAll() {
    return this.achievementRepository.find();
  }

  async findOne(id: number){

    return await this.achievementRepository.findOneBy({id: id});
  }

  async findOneImage(id: number){

    return (await this.achievementRepository.findOneBy({id: id})).image;
  }

  async update(id: number, updateAchievementDto: UpdateAchievementDto) {

    return await this.achievementRepository.update(id, updateAchievementDto);
  }

  async remove(id: number) {

    return await this.achievementRepository.delete({id: id});
  }
}
