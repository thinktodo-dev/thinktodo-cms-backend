import { Module } from '@nestjs/common';
import { UploadAWSService } from './upload-aws.service';
import { UploadAWSController } from './upload-aws.controller';
import { DatabaseModule } from '../database/database.module';
import { uploadAWSProviders } from '../../providers/repository.provider';
import { AdminUploadAWSController } from './admin-upload-aws.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [
    UploadAWSController,
    AdminUploadAWSController,
  ],
  providers: [UploadAWSService,...uploadAWSProviders]
})
export class UploadAWSModule {}
