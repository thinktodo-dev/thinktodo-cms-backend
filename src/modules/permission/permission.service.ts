import { Inject, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PERMISSION_PEPOSITORY } from '../../utils/name.repository';
import { PermissionEntity } from './entities/permission.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {

  constructor(
    @Inject(PERMISSION_PEPOSITORY)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}


  async create(createPermissionDto: CreatePermissionDto) {
    let entity = this.permissionRepository.create(createPermissionDto);
    entity= await this.permissionRepository.save(entity);
    return entity;
  }

  async findAll(options: IPaginationOptions):Promise<Pagination<PermissionEntity>> {
    return  paginate<PermissionEntity>(this.permissionRepository, options);
  }

  findOne(id: number) {
    return `This action returns a #${id} permission`;
  }

  update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}
