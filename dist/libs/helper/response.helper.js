"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHelper = void 0;
const common_1 = require("@nestjs/common");
const error_logs_1 = require("../database/orm/error-logs");
class ResponseHelper {
    static async success({ res, data }) {
        return res.status(common_1.HttpStatus.OK).json({
            data: data,
            statusCode: common_1.HttpStatus.OK,
            message: 'success',
        });
    }
    static async error({ res, error, req, errorCode = common_1.HttpStatus.BAD_REQUEST }) {
        var _a, _b, _c, _d;
        await error_logs_1.ErrorLogs.query().insertAndFetch({
            user_id: ((_b = (_a = req === null || req === void 0 ? void 0 : req.auth) === null || _a === void 0 ? void 0 : _a.user) === null || _b === void 0 ? void 0 : _b.id) ? (_d = (_c = req === null || req === void 0 ? void 0 : req.auth) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.id : null,
            method: req.method,
            status_code: errorCode,
            url: req.url,
            error: error === null || error === void 0 ? void 0 : error.message,
        });
        return res.status(errorCode).json({
            statusCode: errorCode,
            message: [error === null || error === void 0 ? void 0 : error.message, `error in ${req.originalUrl}`],
            error: error === null || error === void 0 ? void 0 : error.response,
        });
    }
}
exports.ResponseHelper = ResponseHelper;
//# sourceMappingURL=response.helper.js.map