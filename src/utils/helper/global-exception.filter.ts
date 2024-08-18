import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { ErrorLogs } from 'src/libs/database/entities/error-logs';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    async catch (exception: any, host: ArgumentsHost) {

        console.log(exception ,"exception---exception")
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let request: any = ctx.getRequest();
        let exceptionResponse = exception?.response;
        let statusCodeException = exceptionResponse?.statusCode ? exceptionResponse?.statusCode : HttpStatus.BAD_REQUEST
        if(exception && !exception.response.message){
        await ErrorLogs.query().insertAndFetch({
            user_id: request?.auth?.user?.id ? request?.auth?.user?.id : null,
            method: request?.method,
            status_code: statusCodeException,
            url: request?.url,
            error: exceptionResponse.response,
        })

        return response.status(statusCodeException).json({
            statusCode: statusCodeException,
            message: exceptionResponse,
            error: exceptionResponse,
        });
    }
    await ErrorLogs.query().insertAndFetch({
        user_id: request?.auth?.user?.id ? request?.auth?.user?.id : null,
        method: request?.method,
        status_code: statusCodeException,
        url: request?.url,
        error: exceptionResponse?.message[0],
    })

    return response.status(statusCodeException).json({
        statusCode: statusCodeException,
        message: exceptionResponse?.message[0],
        error: exceptionResponse?.error,
    });
    }
}
