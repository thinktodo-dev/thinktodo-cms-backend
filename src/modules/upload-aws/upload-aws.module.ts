import { Module } from '@nestjs/common';
import { UploadAWSService } from './upload-aws.service';
import { UploadAWSController } from './upload-aws.controller';

@Module({
  controllers: [UploadAWSController],
  providers: [UploadAWSService]
})
export class UploadAwsModule {}
