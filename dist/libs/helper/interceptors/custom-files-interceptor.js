"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterceptorHelper = void 0;
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const upload_files_1 = require("../upload-files");
class InterceptorHelper {
    static globalFileInterceptorForImage(fieldName, destination) {
        return (0, platform_express_1.FileInterceptor)(fieldName, {
            storage: (0, multer_1.diskStorage)({ destination, filename: upload_files_1.editFileName }),
            fileFilter: upload_files_1.imageFileFilter,
        });
    }
}
exports.InterceptorHelper = InterceptorHelper;
//# sourceMappingURL=custom-files-interceptor.js.map