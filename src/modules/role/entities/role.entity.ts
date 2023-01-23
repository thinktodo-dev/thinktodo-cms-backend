import { Column, Entity, Generated, PrimaryColumn } from "typeorm";
import { CRMBaseEntity } from "../../../utils/crm-base.entity";

@Entity()
export class RoleEntity extends CRMBaseEntity {
    @PrimaryColumn({
        type: "varchar",
        nullable: false,
    })
    @Generated("uuid")
    uuid: string;
}
