import { Test, TestingModule } from '@nestjs/testing';
import { UploadAWSController } from './upload-aws.controller';
import { UploadAWSService } from './upload-aws.service';

describe('UploadAWSController', () => {
  let controller: UploadAWSController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadAWSController],
      providers: [UploadAWSService],
    }).compile();

    controller = module.get<UploadAWSController>(UploadAWSController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
