import { DATA_SOURCE, PERMISSION_PEPOSITORY, ROLE_PEPOSITORY, USER_PEPOSITORY } from '../utils/name.repository';
import { UserRepository } from '../modules/auth/user.repository';
import { RoleRepository } from '../modules/role/role.repository';
import { PermissionRepository } from 'src/modules/permission/permission.repository';


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

export const permissionProviders = [
  {
    provide: PERMISSION_PEPOSITORY,
    useFactory: PermissionRepository,
    inject: [DATA_SOURCE],
  },
];