import { Column, Entity, Generated, Index, PrimaryColumn } from "typeorm";
import { CRMBaseEntity } from "../../../utils/crm-base.entity";

@Entity("role")
export class RoleEntity extends CRMBaseEntity {
    @PrimaryColumn({
        type: "varchar",
        nullable: false,
    })
    @Index({
        unique: true
      })
    @Generated("uuid")
    id: string;

    @Column()
    @Index({
        unique: true
      })
    code: string;

    @Column()
    name: string;

    @Column()
    description: string;
}
