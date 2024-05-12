import { Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToMany, JoinColumn, ManyToMany } from "typeorm"
import { PathStep } from "./pathStep.entity"
import { User } from "../../database/entities-index"
import { Card } from "../../community/entities/card.entity"
import { Speciality } from "./spaciality.entity"

@Entity()
export class Path {

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
            nullable: true,
        }
    )
    description: string

    @ManyToMany(() => Speciality, (speciality) => speciality.paths, {eager: true})
    @JoinTable()
    specialities: Speciality[]

    @ManyToMany(() => User, (user) => {user.analysedPaths}, {onDelete: 'SET NULL', nullable: true})
    @JoinTable()
    users: User[]

    @OneToMany(() => Card, (card) => {card.path}, {onDelete: 'SET NULL', nullable: true})
    @JoinTable()
    cards: Card[]

    @OneToMany(() => PathStep, (pathstep) => pathstep.path, {onDelete: 'CASCADE', eager: true})
    @JoinColumn()
    pathSteps: PathStep[]
}
