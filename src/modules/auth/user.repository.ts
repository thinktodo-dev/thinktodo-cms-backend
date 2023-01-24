import { DataSource } from "typeorm"
import { UserEntity } from "./entities/user.entity"

export const UserRepository =(dataSource: DataSource) => dataSource.getRepository(UserEntity).extend({
    findByName(firstName: string, lastName: string) {
        return this.createQueryBuilder("user")
            .where("user.firstName = :firstName", { firstName })
            .andWhere("user.lastName = :lastName", { lastName })
            .getMany()
    },
})