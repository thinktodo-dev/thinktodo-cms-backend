import { DataSource } from "typeorm";
import { mysqlConnectionConfig } from "./mysql.config";

export const CRMDataSource = new DataSource(mysqlConnectionConfig);