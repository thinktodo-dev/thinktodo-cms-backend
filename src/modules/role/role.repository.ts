import { DataSource } from "typeorm"
import { RoleEntity } from "./entities/role.entity"

export const RoleRepository =(dataSource: DataSource) => dataSource.getRepository(RoleEntity).extend({

})