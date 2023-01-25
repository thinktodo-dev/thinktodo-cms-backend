import { Controller, Get, Post, Body, Patch, Param, Delete, DefaultValuePipe, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NAME_API, PAGE_LIMIT } from '../../utils/constants';
import { JwtAuthGuard } from '../auth/passport/jwt-auth.guard';

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

  
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get roles in system" })
  @UseGuards(JwtAuthGuard)
  @Get('role')
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = PAGE_LIMIT
  ) {
    return this.roleService.findAll({page,limit});
  }

  @Get(`role/:id`)
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @Patch(`role/:id`)
  update(@Param(':id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete('role/:id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
