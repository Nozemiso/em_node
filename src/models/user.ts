
import { IsEmail } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    USER = "user"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    name: string

    @Column({
        unique: true
    })
    @IsEmail()
    email: string

    @Column({ select: false})
    password: string

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER
    })
    role: UserRole

    @Column({
        default: true
    })
    isActive: boolean

}