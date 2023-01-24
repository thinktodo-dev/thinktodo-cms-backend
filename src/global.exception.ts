import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces/features/arguments-host.interface";
import { Response } from "express";
import { CRMError, ERROR_UNKNOWN } from "./utils/crm.error";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException |  CRMError | Error, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse();
    AllExceptionFilter.handleResponse(response, exception);
  }

  private static handleResponse(
    response: Response,
    exception: HttpException | CRMError | Error 
  ): void {
    let responseBody: any = { message: "Something is error" };
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      responseBody = exception.getResponse();
      statusCode = exception.getStatus();
    } else if (exception instanceof CRMError) {
      responseBody = {
        statusCode: statusCode,
        message: exception.message,
        errorCode:exception.errorCode
      };
    } else if (exception instanceof Error) {
      responseBody = {
        statusCode: statusCode,
        message: exception.message,
        errorCode:ERROR_UNKNOWN
      };
    }

    response.status(statusCode).json(responseBody);
  }
}
