import { Column, Entity, Generated, Index, PrimaryColumn } from "typeorm";
import { CRMBaseEntity } from "../../../utils/crm-base.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity("role")
export class RoleEntity extends CRMBaseEntity {
    @ApiProperty()
    @PrimaryColumn({
        type: "varchar",
        nullable: false,
    })
    @Index({
        unique: true
      })
    @Generated("uuid")
    id: string;

    @ApiProperty()
    @Column()
    @Index({
        unique: true
      })
    code: string;

    @ApiProperty()
    @Column()
    name: string;

    @ApiProperty()
    @Column()
    description: string;
}
