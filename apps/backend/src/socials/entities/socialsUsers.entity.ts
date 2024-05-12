import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../database/entities-index";
import { Social } from "./social.entity";

@Entity()
export class SocialUsers {

    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            unique: true,
            nullable: true
        }
    )
    originaluserid: string

    @Column(
        {
            unique: true,
            nullable: true
        }
    )
    url: string

    @ManyToOne(() => User, {onDelete: 'CASCADE'})
    @JoinColumn()
    user: User

    @ManyToOne(() => Social, {onDelete: 'CASCADE'})
    @JoinColumn()
    social: Social
}
