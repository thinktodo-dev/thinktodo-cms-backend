import { CRMBaseEntity } from "../../../utils/crm-base.entity";
import { RoleEntity } from "../../../modules/role/entities/role.entity";
import { Entity, Unique, Column, Index, ManyToMany, Generated, PrimaryColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({
    name: 'permission'
  })
  @Unique(['description'])
  export class PermissionEntity extends CRMBaseEntity {

    @ApiProperty({
        type: String,
        description:"UUID V1"
      })
    @PrimaryColumn({
        type: "varchar",
        nullable: false,
    })
    @Generated("uuid")
    id: string;
    
    @ApiProperty()
    @Column('varchar', { length: 100 })
    module: string;
  
    @ApiProperty()
    @Column()
    description: string;
  
    @ApiProperty()
    @Column('varchar', { length: 255 })
    path: string;
  
    @ApiProperty()
    @Column('varchar', {
      default: 'get',
      length: 20
    })
    method: string;
  
    @ApiProperty()
    @Column()
    canAccess: boolean;
  
  }
