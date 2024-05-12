import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../database/entities-index";
import { Path } from "../../paths/entities/path.entity";
@Entity()
export class Card {
    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false
        }
    )
    title: string

    @Column(
        {
            nullable: false,
            default: "event"
        }
    )
    status: string

    @CreateDateColumn()
    date: string

    @ManyToOne(() => User, (user) => user.cards)
    @JoinTable()
    author: User 

    @ManyToOne(() => Path, (path) => path.cards)
    @JoinTable()
    path?: Path 
}
