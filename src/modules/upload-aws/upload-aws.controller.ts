import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, UseGuards } from '@nestjs/common';
import { UploadAWSService } from './upload-aws.service';
import { DeleteImageDto } from './dto/delete-image.dto';
import { DeleteImagesDto } from './dto/delete-images.dto';
import { MAXIMUM_UPLOAD_IMAGES, MAXIMUM_UPLOAD_SIZE, PATH_UPLOAD } from '../../utils/constants';
import { getDataError } from '../../utils/json-format';
import { ERROR_UPLOAD_FILE } from '../../utils/crm.error';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteFilesDto } from './dto/delete-files.dto';
import { AuthGuard } from '@nestjs/passport';
export const ApiFile = 
  (fileName = "image"): MethodDecorator =>
  (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    ApiBody({
      type: "multipart/form-data",
      required: true,
      schema: {
        type: "object",
        properties: {
          path: {
            type: "string",
          },
          [fileName]: {
            type: "string",
            format: "binary",
          },
        },
      },
    })
  }
@ApiTags("Upload AWS")
@ApiBearerAuth()
@Controller('upload-aws')
export class UploadAWSController {
  constructor(private readonly uploadAWSService: UploadAWSService) {}

  @Post("/core/upload-aws/image")
  @ApiConsumes("multipart/form-data")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({ summary: "Upload single image except svg" })
  @ApiFile()
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {url: "", thumbnail: ""}, message: ""',
  })
  async create(@Req() request, @Res() response ) {
    try {
      request.params.path = PATH_UPLOAD.ADMIN;
      this.uploadAWSService.imageUpload(request, response);
    } catch (error) {
      return getDataError(
        ERROR_UPLOAD_FILE,
        `Failed to upload image file: ${error.message}`,
        null
      );
    }
  }

  @Post("/core/upload-aws/images")
  @ApiConsumes("multipart/form-data")
  @UseGuards(AuthGuard("jwt"))
  @ApiOperation({
    summary: `Upload array image except svg, max ${MAXIMUM_UPLOAD_IMAGES} images`,
  })
  @ApiFile()
  @ApiResponse({
    status: 200,
    description:
      '{code: 1, data:[{url: "", thumbnail: "", small: "",medium: "", large: ""}, {url: ""}], message: ""',
  })
  async createMulti(@Req() request, @Body() body, @Res() response) {
    try {
      request.params.path = PATH_UPLOAD.ADMIN;
      this.uploadAWSService.multiImageUpload(request, response);
    } catch (error) {
      return getDataError(
        ERROR_UPLOAD_FILE,
        `Failed to upload image file: ${error.message}`,
        null
      );
    }
  }
  @Post("/core/upload-aws/delete-image")
  @UseGuards(AuthGuard("jwt"))
  async deleteImg(
    @Req() request,
    @Body() body: DeleteImageDto,
    @Res() response
  ) {
    try {
      const { image_url = "" } = request.body;
      return this.uploadAWSService.removeImg(image_url, response);
    } catch (error) {
      return getDataError(
        ERROR_UPLOAD_FILE,
        `Failed to upload image file: ${error.message}`,
        null
      );
    }
  }
  @Post("/core/upload-aws/delete-images")
  @UseGuards(AuthGuard("jwt"))
  async deleteImgs(
    @Req() request,
    @Body() body: DeleteImagesDto,
    @Res() response
  ) {
    try {
      const { image_url_array = [] } = request.body;
      return this.uploadAWSService.removeMultiImg(image_url_array, response);
    } catch (error) {
      return getDataError(
        ERROR_UPLOAD_FILE,
        `Failed to upload image file: ${error.message}`,
        null
      );
    }
  }
  @Post("/core/upload-aws/files")
  @ApiConsumes("multipart/form-data")
  @UseGuards(AuthGuard("jwt"))
  @ApiBearerAuth()
  @ApiOperation({
    summary: `Upload array file max ${MAXIMUM_UPLOAD_SIZE} byte`,
  })
  @ApiFile()
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: [{url: "",name:""}], message: ""',
  })
  async createMultiFiles(@Req() request, @Body() body, @Res() response) {
    try {
      request.params.path = PATH_UPLOAD.UPLOAD;
      this.uploadAWSService.multiFileUpload(request, response);
    } catch (error) {
      return getDataError(
        ERROR_UPLOAD_FILE,
        `Failed to upload image file: ${error.message}`,
        null
      );
    }
  }

  @Post("/core/upload-aws/delete-files")
  @UseGuards(AuthGuard("jwt"))
  async deleteFiles(
    @Req() request,
    @Body() body: DeleteFilesDto,
    @Res() response
  ) {
    try {
      const { file_url_array = [] } = request.body;
      return this.uploadAWSService.removeMultiFile(file_url_array, response);
    } catch (error) {
      return getDataError(
        ERROR_UPLOAD_FILE,
        `Failed to upload  file: ${error.message}`,
        null
      );
    }
  }
}

