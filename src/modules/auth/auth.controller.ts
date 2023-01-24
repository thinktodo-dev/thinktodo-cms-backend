import { Controller, Get, Post, Body, Patch, Param, Delete, SerializeOptions, ClassSerializerInterceptor, UseInterceptors, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { plainToClass } from 'class-transformer';
import { UserEntity } from './entities/user.entity';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('auth/register')
  async register(@Body() registerUserDto: RegisterUserDto) {
      let userEntity:UserEntity= await this.authService.register(registerUserDto);
      return userEntity;
  }

  @Post('user')
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.create(registerUserDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
