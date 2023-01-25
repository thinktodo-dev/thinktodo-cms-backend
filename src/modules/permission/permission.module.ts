import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { DatabaseModule } from '../database/database.module';
import { permissionProviders } from '../../providers/repository.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PermissionController],
  providers: [PermissionService,...permissionProviders]
})
export class PermissionModule {}
