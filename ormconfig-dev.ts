import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "admin",
  "password": "root",
  "database": "cms_thinktodo_db",
  "synchronize": true,
  "logging": false,
  "entities": [
    "/src/module/**/**.entity{.ts,.js}"
  ],
  "migrations": [
    "./src/migration/*{.ts,.js}"
  ]
});
