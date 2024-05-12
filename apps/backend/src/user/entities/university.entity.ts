import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, JoinTable, ManyToMany, BeforeInsert, BeforeUpdate, AfterInsert, AfterUpdate } from "typeorm"
import { AchievementOwned } from "../../achievement/entities/achievementOwned.entity"
import { OwnedPath } from "../../paths/entities/ownedPath.entity"
import { SocialUsers } from "../../socials/entities/socialsUsers.entity"
import { Path } from "../../paths/entities/path.entity"
import { Card } from "../../community/entities/card.entity"
import { UniTag } from "./uniTag.entity"
import { User } from "./user.entity"

@Entity()
export class Univercity {

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false,
        }
    )
    name: string

    @Column(
        {
            nullable: false,
        }
    )
    city: string

    @Column(
        {
            nullable: false,
        }
    )
    popularity: string

    @Column(
        {
            nullable: false,
        }
    )
    students: number

    @Column(
        {
            nullable: false,
        }
    )
    budgetPlaces: boolean

    @OneToMany(() => UniTag, (tag) => tag.universities)
    @JoinTable()
    tags: UniTag[]

    @Column(
        {
            nullable: true,
        }
    )
    image: string

    @Column(
        { 
            type: "bytea", 
            nullable: false,
            select: false
        }
    )
    imageBuff: Buffer

    @ManyToMany(() => User, (user) => user.universities, {onDelete: 'SET NULL'})
    users: User[]

}
