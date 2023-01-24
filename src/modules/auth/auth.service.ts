import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserEntity } from './entities/user.entity';
import { ROLE_PEPOSITORY, USER_PEPOSITORY } from '../../utils/name.repository';
import { Repository } from 'typeorm';
import { RoleEntity } from '../role/entities/role.entity';
import { ROLES } from '../../config/roles.config';
import { UserStatus } from '../../utils/user-status.enum';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dto/jwt.payload.dto';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_PEPOSITORY)
    private readonly usersRepository: Repository<UserEntity>,

    @Inject(ROLE_PEPOSITORY)
    private readonly rolesRepository: Repository<RoleEntity>,

    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    let userEntity = this.usersRepository.create(registerUserDto);
    userEntity.role_code=ROLES.USER_ROLE;
    userEntity.status=UserStatus.ACTIVE;
    const salt =  bcrypt.genSaltSync();
    userEntity.salt=salt;
    userEntity=await this.usersRepository.save(userEntity);
    userEntity=await this.usersRepository.findOne({where:{id:userEntity.id},relations: ["role"],})
    return userEntity;           
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersRepository.findOne({where:{username:username}});
    if (user && await user.validatePassword(pass)) {
      const { password,salt, ...result } = user;
      return result;
    }
    return null;
  }
  
  async login(user: any) {
    const payload = { username: user.username, id: user.id,name:user.name,role:user.role };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }


  async create(registerUserDto: RegisterUserDto) {
    return 'This action adds a new auth';
  }

  async findAll(options: IPaginationOptions):Promise<Pagination<UserEntity>> {
    return  paginate<UserEntity>(this.usersRepository, options);
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
