import { DataSource } from "typeorm";
import { UploadAWSEntity } from "./entities/upload-aws.entity";

export const UploadAWSRepository =(dataSource: DataSource) => dataSource.getRepository(UploadAWSEntity).extend({

})