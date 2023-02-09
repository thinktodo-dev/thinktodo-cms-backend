import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { DatabaseModule } from '../database/database.module';
import { roleProviders } from '../../providers/repository.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [RoleController],
  providers: [RoleService,...roleProviders]
})
export class RoleModule {}
