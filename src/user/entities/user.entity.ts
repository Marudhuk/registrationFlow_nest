import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column({nullable:true})
    password: string;

    @Column({default: false})
    isVerified: boolean;

    @Column({default:true})   
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: true })
    createdBy: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    updatedBy: number;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

    @Column({ nullable: true })
    deletedBy: number;

}

@Entity()
export class UserOtp{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
    
    @Column()
    otp: string;

    @Column({default:false})
    forgotPassword: boolean;

    @Column({default: false})
    isVerified: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ nullable: true })
    createdBy: number;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ nullable: true })
    updatedBy: number;

    @DeleteDateColumn({ nullable: true })
    deletedAt: Date;

    @Column({ nullable: true })
    deletedBy: number;

}
