import { Inject, Injectable, Req, Res } from '@nestjs/common';
import * as AWS from "aws-sdk";
import { AWS_SETTING, DOMAIN_AWS, DOMAIN_CDN_AWS, MAXIMUM_UPLOAD_IMAGES, MAXIMUM_UPLOAD_SIZE, UPLOAD_SIZES } from '../../utils/constants';
import multerS3Transform = require("multer-s3-transform");
import { StringHelper } from '../../utils/string';
import sharp = require("sharp");
import multerS3 = require("multer-s3");
import * as multer from "multer";
import { getDataError, getDataSuccess } from '../../utils/json-format';
import { ERROR_LIMIT_FILE_SIZE, ERROR_UNKNOWN, ERROR_UPLOAD_FILE, ERROR_UPLOAD_FILE_PATH_WAS_WRONG, ERROR_UPLOAD_FILE_TYPE_WAS_WRONG } from '../../utils/crm.error';
import { changeDomain } from '../../utils/domain';
import { UPLOAD_AWS_PEPOSITORY } from '../../utils/name.repository';
import { Repository } from 'typeorm';
import { UploadAWSEntity } from './entities/upload-aw.entity';

const s3 = new AWS.S3({
  region: AWS_SETTING.regionKey,
  accessKeyId: AWS_SETTING.accessKey,
  secretAccessKey: AWS_SETTING.secretKey,
});

@Injectable()
export class UploadAWSService {
  constructor(
    @Inject(UPLOAD_AWS_PEPOSITORY)
    private readonly uploadAWSRepository: Repository<UploadAWSEntity>,
  ) {}

  imageS3Option = {
    s3: s3,
    bucket: AWS_SETTING.s3Setting.private_bucket,
    contentType: multerS3Transform.AUTO_CONTENT_TYPE,
    acl: "public-read",
    shouldTransform: function(request, file, cb){
      cb(
        null,
        StringHelper.isValidTypeUpload(file.mimetype) && 
        StringHelper.isValidTypeUpload(
          request.params.path || request.body.path
        )
      );
    },
    transforms: UPLOAD_SIZES.map((uploadSize) =>{
      return {
        id: uploadSize.suffix,
        key: function (request, file, cb) {
          const folderUpload = request.params.path || request.body.path;
          const dateUpload = StringHelper.formatDateUpload(new Date());
          cb(
            null, 
            `${folderUpload}/${dateUpload}/${
              uploadSize.suffix
            }_${new Date().getTime()}_${file.originalname}`
          );
        },
        transform: function (request, file, cb) {
          if(uploadSize.size){
            cb(
              null,
              sharp().resize(uploadSize.size, uploadSize.size, {
                fit: "inside",
                withoutEnlargement: true,
              })
            );
          }else{
            cb(null,sharp());
          }
        },
      };
    }),
  };
  fileS3Option = {
    s3: s3,
    bucket: AWS_SETTING.s3Setting.public_bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: function (request, file, cb) {
      const folderUpload = request.params.path || request.body.path;
      const dateUpload = StringHelper.formatDateUpload(new Date());
      cb(
        null,
        `${folderUpload}/${dateUpload}/${new Date().getTime()}_${
          file.originalname
        }`
      );
    },
  };
  async imageUpload(@Req() req, @Res() res){
    try { 
      multer({
        storage: multerS3Transform(this.imageS3Option),
      }).single("image")(req, res, async function (error) {
        if(error){
          return res.json(getDataError(ERROR_UPLOAD_FILE, error.message, null));
        }
        try {
          if(!req.file){
            res.json(getDataError(
              ERROR_UPLOAD_FILE,
              "Cannot read title or file is empty",
              null
            ));
          }else if(req.file && !StringHelper.isValidTypeUpload(req.file.mimetype)){
            res.json(getDataError(
              ERROR_UPLOAD_FILE_TYPE_WAS_WRONG,
              "accept image files except svg",
              null
            ));
          }else if(!StringHelper.isValidTypeUpload(req.params.path || req.body.path)){
            res.json(getDataError(
              ERROR_UPLOAD_FILE_PATH_WAS_WRONG,
              "File path not found",
              null
            ));
          }
          const transforms = req.file.transforms || [];
          const result = {};
          transforms.forEach((transform) =>{
            if(transform.location) result[transform.location] = transform.location;
          });
          console.log(result);
          const uploadFile = this.uploadAWSRepository.create(result);
          await this.uploadAWSRepository.save(uploadFile);
          return res.json(getDataSuccess(uploadFile,"Upload success"))
        } catch (error) {
          return res.json(getDataError(ERROR_UPLOAD_FILE, error.message, null))
        }
      })
    }catch(error){
      return res.json(getDataError(ERROR_UNKNOWN, error.message, null));
    }
  }
  async multiImageUpload(@Req() req, @Res() res){
    try {
      await multer({
        storage: multerS3Transform(this.imageS3Option),
      }).array("images", MAXIMUM_UPLOAD_IMAGES)(
        req,
        res,
        async function (error) {
          if(error) {
            return res.json(
              getDataError(error.code || ERROR_UPLOAD_FILE , error.message, null)
            );
          }
          try{
            if(!StringHelper.isValidPathUpload(req.params.path || req.body.path)) {
              res.json(
                getDataError(
                  ERROR_UPLOAD_FILE_PATH_WAS_WRONG,
                  "File path not found",
                  null
                )
              );
            }
            const resultArray = [];
            req.files.forEach(file => {
              const result = {};
              const transforms = file.transforms || [];
              transforms.forEach(transform => {
                if(transform.location){
                  result[transform.id] = transform.location
                }
              });
              if(transforms.length) resultArray.push(result);
              else resultArray.push({url: file.location});
            });
            return res.json(getDataSuccess(resultArray,"Upload success"));
          } catch(error) {
            return res.json(getDataError(ERROR_UPLOAD_FILE, error.message, null));
          }
        }
      )
    } catch (error) {
      return res.json(getDataError(ERROR_UNKNOWN, error.message, null));
    }
  }
  async removeImg(image_url: any, @Res() res){
    try{
      image_url = changeDomain(image_url, DOMAIN_CDN_AWS, DOMAIN_AWS);
      const key = image_url.split(AWS_SETTING.s3Setting.url)[1];
      s3.deleteObject(
        {
          Bucket: AWS_SETTING.s3Setting.bucket_name,
          Key: `${AWS_SETTING.s3Setting.public_assets}/${key}`,
        },
        (err, data) => {
          if (err) {
            return res.json(getDataError(ERROR_UNKNOWN, "removeImg Error" + err.message,null));
          } else {
            return res.json(getDataSuccess(data, "Removed Success"));
          }
        }
      );
    } catch (error) {
      res.json(
        getDataError(
          ERROR_UPLOAD_FILE,
          `Failed to upload image file: ${error.message}`,
          null
        )
      );
    }
  }

  async removeMultiImg(image_url_array: any, @Res() res){
    try{
      image_url_array = changeDomain(image_url_array, DOMAIN_CDN_AWS, DOMAIN_AWS);
      const keys = image_url_array.map((image_url) => {
        const file_name = image_url.split(AWS_SETTING.s3Setting.url)[1];
        return {
          Key: `${AWS_SETTING.s3Setting.public_assets}/${file_name}`,
        };
      });
      s3.deleteObjects(
        {
          Bucket: AWS_SETTING.s3Setting.bucket_name,
          Delete: {
            Objects: keys,
          },
        },
        (err, data) => {
          if (err) {
            res.json(getDataError(ERROR_UNKNOWN, "RemoveMultiImg Error: "+ err.message ,null))
            throw err;
          } else {
            return res
              ? res.json(getDataSuccess(data, "Removed Success"))
              : getDataSuccess(data, "Removed Success");
          }
        }
      );
    }catch(error){
      if (res)
        res.json(
          getDataError(
            ERROR_UPLOAD_FILE,
            `Failed to upload image file: ${error.message}`,
            null
          )
        );
      else
        getDataError(
          ERROR_UPLOAD_FILE,
          `Failed to upload image file: ${error.message}`,
          null
        );
    }
  }
  async multiFileUpload(@Req() req, @Res() res) {
    try {
      await multer({
        storage: multerS3(this.fileS3Option),
        limits: { fieldSize: MAXIMUM_UPLOAD_SIZE },
        fileFilter: (req, file, cb) => {
          const fileSize = parseInt(req.headers["content-length"]);
          if (fileSize > MAXIMUM_UPLOAD_SIZE) {
            return cb(new Error(`${ERROR_LIMIT_FILE_SIZE}`));
          }
          cb(null, true);
        },
      }).array("files", MAXIMUM_UPLOAD_IMAGES)(
        req,
        res,
        async function (error) {
          if (error)
            return res.json(
              getDataError(error.code || ERROR_UPLOAD_FILE, error.message, null)
            );
          try {
            if (
              !StringHelper.isValidPathUpload(req.params.path || req.body.path)
            )
              res.json(
                getDataError(
                  ERROR_UPLOAD_FILE_PATH_WAS_WRONG,
                  "File path not found",
                  null
                )
              );
            const resultArray = [];
            req.files.forEach((file) => {
              resultArray.push({ name: file.originalname, url: file.location });
            });
            return res.json(getDataSuccess(resultArray, "Upload Success"));
          } catch (error) {
            return res.json(
              getDataError(ERROR_UPLOAD_FILE, error.message, null)
            );
          }
        }
      );
    } catch (error) {
      return res.json(getDataError(ERROR_UNKNOWN, error.message, null));
    }
  }
  async removeMultiFile(file_url_array: any, @Res() res) {
    try {
      file_url_array = changeDomain(
        file_url_array,
        DOMAIN_CDN_AWS,
        DOMAIN_AWS
      );
      const keys = file_url_array.map((file_url) => {
        const file_name = file_url.split(AWS_SETTING.s3Setting.url)[1];
        return {
          Key: `${AWS_SETTING.s3Setting.public_assets}/${file_name}`,
        };
      });
      s3.deleteObjects(
        {
          Bucket: AWS_SETTING.s3Setting.bucket_name,
          Delete: {
            Objects: keys,
          },
        },
        (err, data) => {
          if (err) {
            return res.json(getDataError(ERROR_UNKNOWN,"removeMultiFile Error: " + err.message,null));
          } else {
            return res
              ? res.json(getDataSuccess(data, "Removed Success"))
              : getDataSuccess(data, "Removed Success");
          }
        }
      );
    } catch (error) {
      if (res)
        res.json(
          getDataError(
            ERROR_UPLOAD_FILE,
            `Failed to upload file: ${error.message}`,
            null
          )
        );
      else
        getDataError(
          ERROR_UPLOAD_FILE,
          `Failed to upload file: ${error.message}`,
          null
        );
    }
  }
}
