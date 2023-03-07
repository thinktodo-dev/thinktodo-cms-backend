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
import { CRMBaseService } from '../../utils/crm-base.service';
import { use } from 'passport';
import { EntityId } from 'typeorm/repository/EntityId';
import { CreateSuperAdminDto } from './dto/create-super-admin.dto';
import { UpdateSuperAdminDto } from './dto/update-super-admin.dto';
import { getDataError, getDataSuccess } from 'src/utils/json-format';
import { ERROR_ACCOUNT_NOT_FOUND, ERROR_ACCOUNT_GET, ERROR_UNKNOWN, ERROR_ACCOUNT_CREATED, ERROR_ACCOUNT_UPDATE, ERROR_ACCOUNT_DELETE } from 'src/utils/crm.error';
import { async } from 'rxjs';

@Injectable()
export class AuthService extends CRMBaseService<UserEntity>{
  constructor(
    @Inject(USER_PEPOSITORY)
    private readonly usersRepository: Repository<UserEntity>,

    @Inject(ROLE_PEPOSITORY)
    private readonly rolesRepository: Repository<RoleEntity>,

    private readonly jwtService: JwtService,
  ) {
    super(usersRepository);
  }

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

  async changePassword(userId:string, newPassword: string):Promise<boolean> {
    let userEntity=await this.findOne(userId);
    const salt =  bcrypt.genSaltSync();
    userEntity.password=newPassword;
    userEntity.salt=salt;
    userEntity=await this.usersRepository.save(userEntity);   
    return true;    
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
    console.log(user);
    const payload = { username: user.username, id: user.id,name:user.name,role_code:user.role_code };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async getDetailAccountAdmin(id:string): Promise<any> {
    try {
      let existUser = await this.usersRepository.findOne({where:{id:id}});
      if(!existUser){
        return getDataError(ERROR_UNKNOWN,"User not found",null);
      }else{
        return getDataSuccess(existUser,"Get detail success");
      }
    } catch (error) {
      return getDataError(ERROR_ACCOUNT_GET,error.message,null);
    }
    
  }

  async createAccountAdmin(createSuperAdminDto: CreateSuperAdminDto):Promise<any> {
    try {
      let user = await this.usersRepository.create(createSuperAdminDto);
      user.status=UserStatus.ACTIVE;
      const salt =  bcrypt.genSaltSync();
      user.salt=salt;
      user=await this.usersRepository.save(user);
      user=await this.usersRepository.findOne({where:{id:user.id},relations: ["role"],});
      await this.usersRepository.save(user);
      return getDataSuccess(user,"Created success")
    } catch (error) {
      return getDataError(ERROR_ACCOUNT_CREATED,error.message,null);
    }
  }

  async updateAccountAdmin(id:string, updateSuperAdminDto: UpdateSuperAdminDto):Promise<any> {
    try {
      let existUser = await this.usersRepository.findOne({where:{id:id}});
      if(!existUser){
        return getDataError(ERROR_ACCOUNT_NOT_FOUND,"User not found",null);
      }else{
        let user = await this.usersRepository.create(updateSuperAdminDto);
        user.id = id;
        user.status=UserStatus.ACTIVE;
        const salt =  bcrypt.genSaltSync();
        user.salt=salt;
        user=await this.usersRepository.save(user);
        user=await this.usersRepository.findOne({where:{id:user.id},relations: ["role"],});
        await this.usersRepository.save(user);
        return getDataSuccess(user,"Update success")
      }
    } catch (error) {
      return getDataError(ERROR_ACCOUNT_UPDATE,error.message,null);
    }
    
  }

  async deleteAccountAdmin(id:string): Promise<any>{
    try {
      let existUser = await this.usersRepository.findOne({where:{id:id}});
      if(!existUser){
        return getDataError(ERROR_ACCOUNT_NOT_FOUND,"User not found",null);
      }else{
        await this.usersRepository.delete(id);
        return getDataSuccess(existUser,"Delete success");
      }
    } catch (error) {
      return getDataError(ERROR_ACCOUNT_DELETE,error.message,null);
    }
  }
}
