import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NAME_API } from '../../utils/constants';

@Controller()
@ApiTags("Role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('role')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create role" })
  @ApiResponse({ status: 200, description: "OK" })
  @ApiResponse({ status: 404, description: "Not found" }) 
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get('role')
  findAll() {
    return "hello";
    //return this.roleService.findAll();
  }

  @Get(`role/:uuid`)
  findOne(@Param('uuid') uuid: string) {
    return this.roleService.findOne(+uuid);
  }

  @Patch(`role/:uuid`)
  update(@Param('uuid') uuid: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+uuid, updateRoleDto);
  }

  @Delete('role/:uuid')
  remove(@Param('uuid') uuid: string) {
    return this.roleService.remove(+uuid);
  }
}
