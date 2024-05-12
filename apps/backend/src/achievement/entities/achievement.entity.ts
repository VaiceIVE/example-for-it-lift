import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from "typeorm"
import { AchievementOwned } from "./achievementOwned.entity"

@Entity()
export class Achievement {

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
            type: "bytea", 
            nullable: false,
        }
    )
    image: Buffer

    @OneToMany(() => AchievementOwned, (achievementOwned) => achievementOwned.achievement)
    @JoinTable()
    achievementsOwned: AchievementOwned
}
