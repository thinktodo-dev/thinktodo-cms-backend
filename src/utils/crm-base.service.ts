import { IPaginationOptions, Pagination, paginate } from "nestjs-typeorm-paginate";
import { BaseEntity, FindOneOptions, Repository } from "typeorm";
import { CRMBaseEntity } from "./crm-base.entity";
import { EntityId } from "typeorm/repository/EntityId";
import { UserEntity } from "src/modules/auth/entities/user.entity";

export  abstract class  CRMBaseService<T extends BaseEntity> {
  constructor(
    private readonly baseRepository?: Repository<T>,
  ) { }

  /**
   * check id of T extends BaseEntity, default always Entity has Id
   */
  hasBaseEntityId():boolean{
    return true;
  }

  async findAll(options: IPaginationOptions): Promise<Pagination<T>> {
    if (this.baseRepository) {
      return paginate<T>(this.baseRepository, options);
    } else {
      return null;
    }
  }

  async create(createDto: any) {
    if (this.baseRepository) {
      let entity = this.baseRepository.create(createDto);
      entity= await this.baseRepository.save(entity);
      return entity;
    } else {
      return null;
    }
  }


  async findOne<T>(id: EntityId,whereCondition?:FindOneOptions) {
    if (this.baseRepository) {
      if(whereCondition){
        let entity=await this.baseRepository.findOne(whereCondition);
        if(entity) {
          return entity;
        }
      }else if(this.hasBaseEntityId()){
        let entity=await this.baseRepository.findOne(<any>{ id: id });
        if(entity) {
          return entity;
        }
      }
      return null;
    } else {
      return null;
    }
  }



  async update(id: EntityId, updateDto: any) {
    if (this.baseRepository) {
      let entity=await this.findOne(id);
      if(entity) {
        entity= this.baseRepository.merge(entity, updateDto);
        entity= await this.baseRepository.save(entity);
      }
      return entity;
    } else {
      return null;
    }
  }

  async remove( id: EntityId) {
    if (this.baseRepository) {
      await this.baseRepository.delete(id);
      return true;
    } else {
      return false;
    }
  }


}