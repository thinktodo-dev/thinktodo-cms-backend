import { DATA_SOURCE, USER_PEPOSITORY } from '../utils/name.repository';
import { UserEntity } from '../modules/auth/entities/user.entity';
import { DataSource } from 'typeorm';


export const userProviders = [
  {
    provide: USER_PEPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UserEntity).extend({
        findByName(firstName: string, lastName: string) {
            return this.createQueryBuilder("user")
                .where("user.firstName = :firstName", { firstName })
                .andWhere("user.lastName = :lastName", { lastName })
                .getMany()
        },
    }),
    inject: [DATA_SOURCE],
  },
];