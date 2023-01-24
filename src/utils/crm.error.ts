

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