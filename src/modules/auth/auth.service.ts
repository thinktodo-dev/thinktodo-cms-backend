import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserEntity } from './entities/user.entity';
import { ROLE_PEPOSITORY, USER_PEPOSITORY } from '../../utils/name.repository';
import { CannotCreateEntityIdMapError, Repository } from 'typeorm';
import { RoleEntity } from '../role/entities/role.entity';
import { ROLES } from '../../config/roles.config';
import { UserStatus } from '../../utils/user-status.enum';
import * as bcrypt from 'bcrypt';
import { CRMError, ERROR_AUTH_USER_EXIST } from '../../utils/crm.error';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_PEPOSITORY)
    private usersRepository: Repository<UserEntity>,

    @Inject(ROLE_PEPOSITORY)
    private rolesRepository: Repository<RoleEntity>,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    let userEntity = this.usersRepository.create(registerUserDto);
    userEntity.role_code=ROLES.USER_ROLE;
    userEntity.status=UserStatus.ACTIVE;
    const salt =  bcrypt.genSaltSync(10);
    userEntity.salt=salt;
    userEntity=await this.usersRepository.save(userEntity);
    userEntity=await this.usersRepository.findOne({where:{id:userEntity.id},relations: ["role"],})
    return userEntity;           
  }


  async create(registerUserDto: RegisterUserDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
