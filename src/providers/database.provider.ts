import { mysqlConnectionConfig } from "src/config/mysql.config";
import { DataSource } from "typeorm";
import { DATA_SOURCE } from "../utils/name.repository";
import { CRMDataSource } from "../config/datasource.config";
export const databaseProviders = [
    {
      provide: DATA_SOURCE,
      useFactory: async () => {
        const dataSource = CRMDataSource;
        return dataSource.initialize();
      },
    },
  ];