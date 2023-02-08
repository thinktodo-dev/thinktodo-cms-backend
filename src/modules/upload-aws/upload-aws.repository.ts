import { DataSource } from "typeorm";
import { UploadAWSEntity } from "./entities/upload-aw.entity";

export const UploadAWSRepository =(dataSource: DataSource) => dataSource.getRepository(UploadAWSEntity).extend({

})