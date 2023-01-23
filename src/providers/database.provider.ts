import { mysqlConnectionConfig } from "src/config/mysql.config";
import { DataSource } from "typeorm";
import { DATA_SOURCE } from "../utils/name.repository";
export const databaseProviders = [
    {
      provide: DATA_SOURCE,
      useFactory: async () => {
        const dataSource = new DataSource(mysqlConnectionConfig);
        return dataSource.initialize();
      },
    },
  ];