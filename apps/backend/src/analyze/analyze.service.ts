import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SocialsService } from '../socials/socials.service';
import axios from 'axios';
import { ModelResultDto } from '../achievement/dto/vkResultDto.dto';
import { PathsService } from '../paths/paths.service';

@Injectable()
export class AnalyzeService {

    constructor(
        private userService: UserService,
        private socialsService: SocialsService,
        private pathService: PathsService   
    ){}
    public async analyzeUserById(userid: number)
    {
        const user = await this.userService.getOneById(userid)

        const userSocials = await this.socialsService.findLinksByUserId(userid)

        Logger.log(JSON.stringify(userSocials))

        if(userSocials.filter((obj) => {return obj.social.name == 'VK'}).length > 0)
        {
            Logger.log(userSocials.filter((obj) => {return obj.social.name == 'VK'}))

            const userVKid = userSocials.filter((obj) => {return obj.social.name == 'VK'})[0].originaluserid

            var vkResultWorks: ModelResultDto = (await axios.get(`http://178.170.192.87:9000/vk/simple_analize_interests/?user_id=${userVKid}&n_of_works=4`)).data

            Logger.log(vkResultWorks)
        }  
        if(userSocials.filter((obj) => {return obj.social.name == 'LeaderID'}).length > 0)
        {
            const leaderID = userSocials.filter((obj) => {return obj.social.name == 'LeaderID'})[0].originaluserid
            Logger.log(leaderID)

            var leaderResultWorks: ModelResultDto = (await axios.get(`http://178.170.192.87:9000/leaderid/get_works/?user_id=${leaderID}&n_of_works=4`)).data
        }

        user.isAnalyzed = true

        let results = []

        if(vkResultWorks)
        {
            if(leaderResultWorks)
            {
                var worksname: string[] = [...new Set(vkResultWorks.name.concat(leaderResultWorks.name))]
            }
            else
            {
                var worksname: string[] = vkResultWorks.name
            }
        }
        else
        {
            if(leaderResultWorks)
            {
                var worksname: string[] = leaderResultWorks.name
            }
            else
            {
                var worksname: string[] = []
            }
        }

        for (const work of worksname)
        {
            if(await this.pathService.findOneByName(work))
            {
                Logger.log('EXISTS')
                results.push(await this.pathService.findOneByName(work))
            }
            else
            {
                Logger.log('NEW')
                results.push(await this.pathService.createProfMock(work))
            }
        }

        if(user.analysedPaths)
        {
            user.analysedPaths.push(...results)
        }
        else
        {
            user.analysedPaths = results
        }

        this.userService.save(user)

        return {result: results}
    }

    public async mockAnalyze(userid: number)
    {
        const user = await this.userService.getOneById(userid)

        const worksname = ["Специалист по машинному обучению", "Учитель", "Системный аналитик"]

        const leaderResultWorks = []

        user.isAnalyzed = true

        let results = []

        for (const work of worksname)
        {
            if(await this.pathService.findOneByName(work))
            {
                Logger.log('EXISTS')
                results.push(await this.pathService.findOneByName(work))
            }
            else
            {
                Logger.log('NEW')
                results.push(await this.pathService.createProfMock(work))
            }
        }

        if(user.analysedPaths)
        {
            user.analysedPaths.push(...results)
        }
        else
        {
            user.analysedPaths = results
        }

        this.userService.save(user)

        return {result: results}

    }
}
