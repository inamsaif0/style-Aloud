"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const error_logs_1 = require("../../libs/database/entities/error-logs");
let GlobalExceptionFilter = class GlobalExceptionFilter {
    async catch(exception, host) {
        var _a, _b, _c, _d;
        console.log(exception, "exception---exception");
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let request = ctx.getRequest();
        let exceptionResponse = exception === null || exception === void 0 ? void 0 : exception.response;
        let statusCodeException = (exceptionResponse === null || exceptionResponse === void 0 ? void 0 : exceptionResponse.statusCode) ? exceptionResponse === null || exceptionResponse === void 0 ? void 0 : exceptionResponse.statusCode : common_1.HttpStatus.BAD_REQUEST;
        await error_logs_1.ErrorLogs.query().insertAndFetch({
            user_id: ((_b = (_a = request === null || request === void 0 ? void 0 : request.auth) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id) ? (_d = (_c = request === null || request === void 0 ? void 0 : request.auth) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.id : null,
            method: request === null || request === void 0 ? void 0 : request.method,
            status_code: statusCodeException,
            url: request === null || request === void 0 ? void 0 : request.url,
            error: exceptionResponse === null || exceptionResponse === void 0 ? void 0 : exceptionResponse.message[0],
        });
        return response.status(statusCodeException).json({
            statusCode: statusCodeException,
            message: exceptionResponse === null || exceptionResponse === void 0 ? void 0 : exceptionResponse.message,
            error: exceptionResponse === null || exceptionResponse === void 0 ? void 0 : exceptionResponse.error,
        });
    }
};
GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)()
], GlobalExceptionFilter);
exports.GlobalExceptionFilter = GlobalExceptionFilter;
//# sourceMappingURL=global-exception.filter.js.map