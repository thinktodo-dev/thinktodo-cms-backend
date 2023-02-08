import { Test, TestingModule } from '@nestjs/testing';
import { UploadAWSService } from './upload-aws.service';

describe('UploadAwsService', () => {
  let service: UploadAWSService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadAWSService],
    }).compile();

    service = module.get<UploadAWSService>(UploadAWSService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
