export const NAME_API = "core";
export const JWT_SECRET= process.env.JWTSecret || 'secret'
export const PAGE_LIMIT=15
export const JWT_EXPIRED_IN=process.env.JWT_EXPIRED_IN || '30m'

//Ws3
export const AWS_SETTING = {
  accessKey: process.env.AWS_ACCESS_KEY || "AKIAXLHILBZ4XTB5FWY7",
  regionKey: process.env.AWS_REGION_KEY || "ap-southeast-1",
  secretKey:
    process.env.AWS_SECRET_KEY || "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",
  s3Setting: {
    bucket_name: `${process.env.AWS_BUCKET_NAME}` || "dev-bluebolt-vn",
    public_assets: `${process.env.AWS_PUBLIC_ASSETS}` || "public",
    public_bucket:
      `${process.env.AWS_BUCKET_NAME}/${process.env.AWS_PUBLIC_ASSETS}` ||
      "dev-bluebolt-vn/public",
    private_bucket:
      `${process.env.AWS_BUCKET_NAME}/${process.env.AWS_PUBLIC_ASSETS}` ||
      "dev-bluebolt-vn/private",
    key: process.env.S3_KEY_FOLDER || "public",
    ACL: process.env.S3_ACL || "public-read",
    url:
      process.env.S3_URL ||
      "dev-bluebolt-vn.s3.ap-southeast-1.amazonaws.com/public",
  },
};
//AWS
export const DOMAIN_AWS = `${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION_KEY}.amazonaws.com`;
export const DOMAIN_CDN_AWS = process.env.AWS_CDN_SERVER;
export const UPLOAD_SIZES = [
  {
    suffix: "thumbnail",
    size: 200,
  },
  {
    suffix: "small",
    size: 300,
  },
  {
    suffix: "medium",
    size: 500,
  },
  {
    suffix: "large",
    size: 800,
  },
  {
    suffix: "url",
  },
];
export const MAXIMUM_UPLOAD_IMAGES = 10;
export const MAXIMUM_UPLOAD_SIZE = 4 * 1024 * 1024; // 4mb
export const PATH_UPLOAD = {
  MANAGER: "manager",
  USER: "user",
  ADMIN: "admin",
  HELP_DESK: "help_desk",
  UPLOAD: "upload",
  ANONYMOUS:"anonymous" ,
  PUBLIC:"PUBLIC" ,
};
export const UPLOAD_CONFIG = {
  RESIZE_IMAGE_WIDTH: Number(process.env.RESIZE_IMAGE_WIDTH).valueOf() || 400,
  RESIZE_IMAGE_HEIGHT: Number(process.env.RESIZE_IMAGE_HEIGHT).valueOf() || 400,
};