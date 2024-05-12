import { Card } from "../../community/entities/card.entity"
import { AchievementOwned } from "../../database/entities-index"
import { OwnedPath } from "../../paths/entities/ownedPath.entity"
import { Path } from "../../paths/entities/path.entity"
import { SocialUsers } from "../../socials/entities/socialsUsers.entity"

export class UserUpdateDto
{
    username?: string
    nickname?: string
    password?: string
    role?: "admin" | "user"
    rank?: string
    type?: string
    ratingPlacement?: number
    refreshToken?: string
    isAnalyzed?: boolean
    grade?: "8" | "9" | "10" | "11" 
    points?: number
    avataruri?: string
    socials?: SocialUsers[]
    paths?: OwnedPath[]
    analysedPaths?: Path[]
    cards?: Card[]
    achievements?: AchievementOwned[]
}
