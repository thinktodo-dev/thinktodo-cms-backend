import { DataSource } from "typeorm"
import { PermissionEntity } from "./entities/permission.entity"

export const PermissionRepository =(dataSource: DataSource) => dataSource.getRepository(PermissionEntity).extend({
})