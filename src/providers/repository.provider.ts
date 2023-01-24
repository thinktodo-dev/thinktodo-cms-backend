import { DATA_SOURCE, ROLE_PEPOSITORY, USER_PEPOSITORY } from '../utils/name.repository';
import { UserRepository } from '../modules/auth/user.repository';
import { RoleRepository } from '../modules/role/role.repository';


export const userProviders = [
  {
    provide: USER_PEPOSITORY,
    useFactory: UserRepository,
    inject: [DATA_SOURCE],
  },
];

export const roleProviders = [
  {
    provide: ROLE_PEPOSITORY,
    useFactory: RoleRepository,
    inject: [DATA_SOURCE],
  },
];