import { join } from "path";
import { DataSource } from "typeorm";

export const mysqlConnectionConfig={
    type: "mysql" as "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306).valueOf(),
    username: process.env.DB_USERNAME || "admin",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_DATABASE || "cms_thinktodo_db",
    entities: [join(__dirname, "../modules/**/*.entity{.ts,.js}")],
    subscribers: [],
    synchronize: false,
    logging: false,
    timezone: "+00:00",
    migrations: [
        join(__dirname, "../migration/*{.ts,.js}")
    ]
    //logger: new TaskdinoLoggerTypeOrm(),
}

