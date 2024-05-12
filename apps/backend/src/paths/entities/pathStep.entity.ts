import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinTable, ManyToMany, JoinColumn } from "typeorm"
import { Path } from "./path.entity"
import { PathStepTag } from "./pathTag.entity"
import { PathStepContent } from "./pathStepContent.entity"

@Entity()
export class PathStep {

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false,
        }
    )
    step: number

    @Column(
        {
            nullable: false,
        }
    )
    title: string

    @Column(
        {
            nullable: false,
        }
    )
    points: number

    @ManyToMany(() => PathStepTag, (pathTag) => pathTag.pathSteps, {eager: true})
    @JoinTable()
    tags: PathStepTag[]

    @OneToOne(() => PathStepContent, {eager: true})
    @JoinColumn()
    content: PathStepContent   

    @ManyToOne(() => Path, (path) => path.pathSteps,  {cascade: true, onUpdate: 'CASCADE', onDelete: 'CASCADE'})
    @JoinColumn()
    path: Path
}
