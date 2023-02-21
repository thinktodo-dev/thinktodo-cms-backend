import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, DefaultValuePipe, ParseIntPipe, Put, ClassSerializerInterceptor } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PAGE_LIMIT } from '../../utils/constants';
import { AuthService } from './auth.service';
import { CreateSuperAdminDto } from './dto/create-super-admin.dto';
import { UpdateSuperAdminDto } from './dto/update-super-admin.dto';
import { JwtAuthGuard } from './passport/jwt-auth.guard';

@Controller()
@ApiTags("super-admin")
@UseInterceptors(ClassSerializerInterceptor)
export class SuperAdminController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: "Create user" })
  @UseGuards(JwtAuthGuard)
  @Post('super-admin')
  createAccountAdmin(@Body() createSuperAdminDto: CreateSuperAdminDto) {
    return this.authService.createAccountAdmin(createSuperAdminDto);
  }

  @Get('super-admin/list')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all users" })
  @UseGuards(JwtAuthGuard)
  findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = PAGE_LIMIT
  ) {
    return this.authService.findAll({page,limit});
  }

  @Get('super-admin/:id')
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get detail" })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.authService.getDetailAccountAdmin(id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Update user" })
  @UseGuards(JwtAuthGuard)
  @Put('super-admin/:id')
  update(@Param('id') id: string, @Body() updateSuperAdminDto: UpdateSuperAdminDto) {
    return this.authService.updateAccountAdmin(id, updateSuperAdminDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete user" })
  @UseGuards(JwtAuthGuard)
  @Delete('super-admin/:id')
  remove(@Param('id') id: string) {
    return this.authService.deleteAccountAdmin(id);
  }
}
