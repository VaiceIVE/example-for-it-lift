import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SocialUsers } from "./socialsUsers.entity";

@Entity()
export class Social {
    @PrimaryGeneratedColumn()
    id: number

    @Column(
        {
            nullable: false
        }
    )
    name: string

    @Column(
        {
            nullable: false
        }
    )
    description: string

    @Column(
        { 
            type: "bytea", 
            nullable: true,
            select: false
        }
    )
    imagebuff: Buffer

    @Column(
        {
            nullable: true
        }
    )
    image: string

    @OneToMany(() => SocialUsers, (socialUsers) => socialUsers.social)
    @JoinColumn()
    social: SocialUsers
}
