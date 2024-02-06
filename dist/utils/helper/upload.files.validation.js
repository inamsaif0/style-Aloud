"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFileValidate = exports.videosFileFilter = exports.editFileName = exports.imageAndVideoFileFilter = exports.imageFileFilter = void 0;
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const global_enum_1 = require("../../utils/enum/global.enum");
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|SAG|GPG|PNG|JPEG|GIF)$/)) {
        return callback(new common_1.HttpException({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: [`only allow  ${global_enum_1.FileExtensionsEnum.Image} `],
            error: "Bad Request",
        }, common_1.HttpStatus.BAD_REQUEST), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
const imageAndVideoFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|mp4|avi|mov|webm|MP4|AVI|MOV|WEBM|SAG|GPG|PNG|JPEG|GIF)$/)) {
        return callback(new common_1.HttpException({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: [`only allow ${global_enum_1.FileExtensionsEnum.All}`],
            error: "Bad Request",
        }, common_1.HttpStatus.BAD_REQUEST), false);
    }
    callback(null, true);
};
exports.imageAndVideoFileFilter = imageAndVideoFileFilter;
const editFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = (0, path_1.extname)(file.originalname);
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    var fileNameNew = `${name.replace(/-|\s/g, "-")}-${randomName.replace(/-|\s/g, "-")}${fileExtName}`;
    callback(null, fileNameNew.toLowerCase());
};
exports.editFileName = editFileName;
const videosFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(mp4|avi|mov|webm|MP4|AVI|MOV|WEBM)$/)) {
        return callback(new common_1.HttpException({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: [`only allow ${global_enum_1.FileExtensionsEnum.Video}`],
            error: "Bad Request",
        }, common_1.HttpStatus.BAD_REQUEST), false);
    }
    callback(null, true);
};
exports.videosFileFilter = videosFileFilter;
const imageFileValidate = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|svg|mp4|avi|mov|webm|MP4|AVI|MOV|WEBM|SAG|GPG|PNG|JPEG|GIF)$/)) {
        return callback(new common_1.HttpException({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: [`only allow ${global_enum_1.FileExtensionsEnum.Image}`],
            error: "Bad Request"
        }, common_1.HttpStatus.BAD_REQUEST), false);
    }
    callback(null, true);
};
exports.imageFileValidate = imageFileValidate;
//# sourceMappingURL=upload.files.validation.js.map