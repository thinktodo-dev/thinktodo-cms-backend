import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { DataSource } from "typeorm";
import { RoleModule } from './modules/role/role.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql" as "mysql",
      host: process.env.DB_HOST || "localhost",
      port: Number(process.env.DB_PORT || 3306).valueOf(),
      username: process.env.DB_USERNAME || "admin",
      password: process.env.DB_PASSWORD || "root",
      database: process.env.DB_DATABASE || "cms_thinktodo_db",
      entities: [join(__dirname, "/module/**/*.entity{.ts,.js}")],
      subscribers: [],
      synchronize: false,
      logging: false,
      timezone: "+00:00",
      //logger: new TaskdinoLoggerTypeOrm(),
  }),
    RoleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
