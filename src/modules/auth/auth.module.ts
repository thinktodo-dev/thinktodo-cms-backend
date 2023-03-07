import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from '../database/database.module';
import { roleProviders, userProviders } from '../../providers/repository.provider';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './passport/local.strategy';
import { JWT_EXPIRED_IN, JWT_SECRET } from '../../utils/constants';
import { JwtStrategy } from './passport/jwt.strategy';
import { SuperAdminController } from './super-admin.controller';

@Module({
  imports: [DatabaseModule,PassportModule,JwtModule.register({
    secret: JWT_SECRET,
    signOptions: { expiresIn: JWT_EXPIRED_IN },
  }),],
  controllers: [AuthController,SuperAdminController],
  providers: [AuthService,...userProviders,...roleProviders,LocalStrategy,JwtStrategy]
})
export class AuthModule {}
