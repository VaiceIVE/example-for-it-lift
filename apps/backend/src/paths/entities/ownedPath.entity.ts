import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, PrimaryColumn, JoinColumn } from "typeorm"
import { User } from "../../database/entities-index"
import { Path } from "./path.entity"

@Entity()
export class OwnedPath {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Path, {eager: true, onDelete: 'CASCADE'})
    @JoinColumn()
    path: Path

    @ManyToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn()
    user: User

    @Column(
        {
            nullable: false,
            default: 1
        }
    )
    currentStep: number
}
