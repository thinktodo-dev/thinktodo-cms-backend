import { PartialType } from '@nestjs/swagger';
import { CreatePermissionDto } from './create-permission.dto';
import { IsLowercase, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
    @IsString()
    @IsLowercase()
    @IsNotEmpty()
    id: string;
}
