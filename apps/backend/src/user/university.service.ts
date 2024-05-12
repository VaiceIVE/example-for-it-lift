import { Injectable, Logger } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Univercity } from "./entities/university.entity"
import { Repository } from "typeorm"
import { CreateUniDto } from "./dtos/createUni.dto"
import { UniTag } from "./entities/uniTag.entity"

@Injectable()
export class UniversityService {
    constructor(
        @InjectRepository(Univercity)
        private uniRepository: Repository<Univercity>,
        @InjectRepository(UniTag)
        private uniTagRepository: Repository<UniTag>
    ){}

    public async create(uni: CreateUniDto)
    {
        uni.tags = String(uni.tags)
        let tags:UniTag[] = []
        // for (const tag of uni.tags)
        // {
        //     if (await this.uniTagRepository.findOneBy({name: tag}))
        //     {
        //         tags.push(await this.uniTagRepository.findOneBy({name: tag}))
        //     }
        //     else
        //     {
        //         const newTag = this.uniTagRepository.create({name: tag})
        //         const tagToAdd = await this.uniTagRepository.save(newTag)
        //         tags.push(tagToAdd)
        //     }
        // }
        const newTag1 = this.uniTagRepository.create({name: 'После 9'})
        const tagToAdd1 = await this.uniTagRepository.save(newTag1)
        tags.push(tagToAdd1)
        const newTag2 = this.uniTagRepository.create({name: 'После 11'})
        const tagToAdd2 = await this.uniTagRepository.save(newTag2)
        tags.push(tagToAdd2)
        const newTag = this.uniTagRepository.create({name: uni.tags})
        const tagToAdd = await this.uniTagRepository.save(newTag)
        tags.push(tagToAdd)
        const newUni = this.uniRepository.create({...uni, tags: tags})
        await this.uniRepository.save(newUni)
        newUni.image = `https://api.adera-team.ru/university/image/${newUni.id}`
        return await this.uniRepository.save(newUni)
    }

public async addTags(id: number, tags: string[])
{
    let uni = await this.uniRepository.findOne({where: {id: id}})
    let newTags = []
    for (const tagName of tags)
    {
        const newTag = this.uniTagRepository.create({name: tagName})
        const tagToAdd = await this.uniTagRepository.save(newTag)
        newTags.push(tagToAdd)
    }
    uni.tags = uni.tags ? uni.tags.concat(newTags) : newTags
    return this.uniRepository.save(uni)
}

    public async droptags()
    {
        return await this.uniTagRepository.delete({})
    }

    public async getAll()
    {
        return await this.uniRepository.find({relations: {tags: true}})
    }

    public async getOne(id: number)
    {
        return await this.uniRepository.findOne({where: {id: id},relations: {tags: true}})
    }

    public async getImage(id: number)
    {
        return (await this.uniRepository.findOne({where: {id: id}, select: {imageBuff: true}})).imageBuff
    }

    public async dropall()
    {
        return await this.uniRepository.delete({})
    }

    public async deleteById(id: number)
    {
        return await this.uniRepository.delete({id: id})
    }
}