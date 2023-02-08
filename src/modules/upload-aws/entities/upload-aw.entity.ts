import { IsNotEmpty } from "class-validator";
import { CRMBaseEntity } from "../../../utils/crm-base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'upload_file'
  })
export class UploadAWSEntity extends CRMBaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "varchar",
        nullable: false,
    })
    @IsNotEmpty()
    name: string;
    
    @Column({
        type: "varchar",
        nullable: true,
    })
    alternative_text: string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    caption: string;

    @Column({
        type: "int",
        nullable: true,
    })
    width: number;

    @Column({
        type: "int",
        nullable: true,
    })
    height: number;

    @Column({
        type: "longtext",
        nullable: true,
    })
    formats: string;

    @Column({
        type: "varchar",
        nullable: false,
    })
    @IsNotEmpty()
    hash: string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    ext: string;

    @Column({
        type: "varchar",
        nullable: false,
    })
    @IsNotEmpty()
    mime: string;

    @Column({
        type: "decimal",
        nullable: false,
    })
    @IsNotEmpty()
    size: number;

    @Column({
        type: "varchar",
        nullable: false,
    })
    @IsNotEmpty()
    url: string;

    @Column({
        type: "varchar",
        nullable: true,
    })
    preview_url: string;

    @Column({
        type: "varchar",
        nullable: false,
    })
    @IsNotEmpty()
    provider: string;

    @Column({
        type: "longtext",
        nullable: true,
    })
    provider_metadata: string;

    @Column({
        type: "timestamp",
        nullable: true,
    })
    published_at: Date;

    @Column({
        type: "int",
        nullable: true,
    })
    create_by: number;

    @Column({
        type: "int",
        nullable: true,
    })
    update_by: number;
}
