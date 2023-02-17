

export class CRMError extends Error {
    constructor(errorCode :string,message?:string){
        super();
        this.errorCode=errorCode;  
        this.message=message;  
        // 👇️ because we are extending a built-in class
        Object.setPrototypeOf(this, CRMError.prototype);
          
    }


    errorCode: string
}

export const ERROR_UNKNOWN="ERROR_UNKNOWN";
export const ERROR_AUTH_USER_EXIST="ERROR_AUTH_USER_EXIST";

/** Upload **/
export const ERROR_UPLOAD_FILE = "ERROR_UPLOAD_FILE";
export const ERROR_UPLOAD_FILE_PATH_WAS_WRONG =
  "ERROR_UPLOAD_FILE_PATH_WAS_WRONG";
export const ERROR_UPLOAD_FILE_TYPE_WAS_WRONG =
  "ERROR_UPLOAD_FILE_TYPE_WAS_WRONG";

/** File **/
export const ERROR_LIMIT_FILE_SIZE = "ERROR_LIMIT_FILE_SIZE";