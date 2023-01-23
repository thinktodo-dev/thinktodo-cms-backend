import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserEntity } from './entities/user.entity';
import { USER_PEPOSITORY } from '../../utils/name.repository';
import { Repository } from 'typeorm';


@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_PEPOSITORY)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    let userEntity = this.usersRepository.create(registerUserDto);
    userEntity=await this.usersRepository.save(userEntity);
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
