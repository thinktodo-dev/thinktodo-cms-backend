import { Inject, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { CRMBaseService } from '../../utils/crm-base.service';
import { RoleEntity } from './entities/role.entity';
import { ROLE_PEPOSITORY } from '../../utils/name.repository';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService extends CRMBaseService<RoleEntity>{
  constructor(
    @Inject(ROLE_PEPOSITORY)
    private readonly rolesRepository: Repository<RoleEntity>,

  ) {
    super(rolesRepository);
  }

}
