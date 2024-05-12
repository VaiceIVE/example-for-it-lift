import { Entity, PrimaryGeneratedColumn, Column, JoinTable, OneToMany, JoinColumn, ManyToMany, PrimaryColumn } from "typeorm"
import { PathStep } from "./pathStep.entity"
import { User } from "../../database/entities-index"
import { Card } from "../../community/entities/card.entity"
import { Path } from "./path.entity"

@Entity()
export class Speciality {

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false,
        }
    )
    name: string

    @ManyToMany(() => Path, (path) => {path.specialities})
    @JoinTable()
    paths: Path[]
}
