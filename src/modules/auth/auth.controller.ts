import { Controller, Get, Post, Body, Patch, Param, Delete, SerializeOptions, ClassSerializerInterceptor, UseInterceptors, BadRequestException, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { plainToClass } from 'class-transformer';
import { UserEntity } from './entities/user.entity';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './dto/login-user.dto';
import { LocalAuthGuard } from './passport/local-auth.guard';
@ApiTags("Auth")
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: RegisterUserDto })
  @ApiOperation({ summary: "Register new user from client web/mobile" })
  @ApiResponse({ status: 201, description: "OK" ,type:UserEntity})
  @ApiResponse({ status: 404, description: "NOT_FOUND" })
  @Post('auth/register')
  async register(@Body() registerUserDto: RegisterUserDto) {
      let userEntity:UserEntity= await this.authService.register(registerUserDto);
      return userEntity;
  }

  @ApiBody({ type: UserLoginDto })
  @ApiOperation({ summary: "Login user from client web/mobile" })
  @ApiResponse({ status: 201, description: "OK" ,type:UserEntity})
  @ApiResponse({ status: 404, description: "NOT_FOUND" })
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
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
