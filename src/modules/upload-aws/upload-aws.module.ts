import { Module } from '@nestjs/common';
import { UploadAWSService } from './upload-aws.service';
import { UploadAWSController } from './upload-aws.controller';
import { DatabaseModule } from '../database/database.module';
import { uploadAWSProviders } from 'src/providers/repository.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UploadAWSController],
  providers: [UploadAWSService,...uploadAWSProviders]
})
export class UploadAWSModule {}
