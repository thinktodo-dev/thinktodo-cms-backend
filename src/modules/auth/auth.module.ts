import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { roleProviders, userProviders } from '../../providers/repository.provider';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './passport/local.strategy';
import { JWT_SECRET } from '../../utils/constants';

@Module({
  imports: [DatabaseModule,PassportModule,JwtModule.register({
    secret: JWT_SECRET,
    signOptions: { expiresIn: process.env.JWT_EXPIRED_IN || '60s' },
  }),],
  controllers: [AuthController],
  providers: [AuthService,...userProviders,...roleProviders,LocalStrategy]
})
export class AuthModule {}
