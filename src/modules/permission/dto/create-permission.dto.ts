import { ApiProperty } from "@nestjs/swagger";
import { IsLowercase, IsString } from "class-validator";

export class CreatePermissionDto {
    
    @ApiProperty()
    @IsString()
    @IsLowercase()
    module: string;
  
    @ApiProperty()
    @IsString()
    description: string;
  
    @ApiProperty()
    @IsString()
    @IsLowercase()
    path: string;
  
    @ApiProperty()
    @IsString()
    @IsLowercase()
    method: string;
  
    @ApiProperty()
    canAccess: boolean;
}
