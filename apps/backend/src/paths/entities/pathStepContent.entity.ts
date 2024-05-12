import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinTable, JoinColumn } from "typeorm"
import { PathStep } from "./pathStep.entity"

@Entity()
export class PathStepContent {

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: true
        }
    )
    link: string

    @Column(
        {
            nullable: true
        }
    )
    questionsCount: number

    @Column(
        {
            nullable: true
        }
    )
    text: string

    @OneToOne(() => PathStep,  {cascade: true, onDelete: 'CASCADE'})
    @JoinColumn()
    step: PathStep
}
