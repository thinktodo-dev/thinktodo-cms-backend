import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { DataSource } from "typeorm";
import { RoleModule } from './modules/role/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { mysqlConnectionConfig } from "./config/mysql.config";
import { PermissionModule } from './modules/permission/permission.module';
import { UploadAWSModule } from './modules/upload-aws/upload-aws.module';



@Module({
  imports: [
    TypeOrmModule.forRoot(mysqlConnectionConfig),
    RoleModule,
    AuthModule,
    PermissionModule,
    UploadAWSModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
