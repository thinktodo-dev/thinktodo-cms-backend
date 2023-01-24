import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, Generated, Index, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import { DB_TABLE } from "../../../config/db.table.config";
import { CRMBaseEntity } from "../../../utils/crm-base.entity";
import { UserStatus } from "../../../utils/user-status.enum";
import { RoleEntity } from "../../role/entities/role.entity";
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity("user")
export class UserEntity extends CRMBaseEntity {
    @PrimaryColumn({
        type: "varchar",
        nullable: false,
    })
    @Generated("uuid")
    id: string;

    @Index({
        unique: true
    })
    @Column()
    username: string;

    @Exclude({
        toPlainOnly: true
    })
    @Column()
    password: string;


    @Column()
    type_account: string;

    @Column()
    email: string;


    @Index()
    @Column()
    name: string;

    @Column()
    status: UserStatus;

    @Exclude({
        toPlainOnly: true
    })
    @Column()
    salt: string;

    @OneToOne(() => RoleEntity, (role) => role.code) //Lazy loading name=role_code if column in UserEntity, referencedColumnName = code is column in RoleEntity
    @JoinColumn({ name: "role_code", referencedColumnName: "code" })
    role: RoleEntity;

    @Column()
    role_code: string;

    @Exclude({
        toPlainOnly: true
    })
    skipHashPassword = false;

    @BeforeInsert()
    async hashPasswordBeforeInsert() {
        if (this.password && !this.skipHashPassword) {
            await this.hashPassword();
        }
    }

    @BeforeUpdate()
    async hashPasswordBeforeUpdate() {
        if (this.password && !this.skipHashPassword) {
            await this.hashPassword();
        }
    }

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, this.salt);
    }

    constructor(partial: Partial<UserEntity>) {
        super();
        Object.assign(this, partial);
    }
}


