"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRelatedTypeEnum = exports.NotificationTypeEnum = exports.FileExtensionsEnum = void 0;
var FileExtensionsEnum;
(function (FileExtensionsEnum) {
    FileExtensionsEnum["All"] = "jpg|jpeg|png|gif|svg|mp4|avi|mov|webm|MP4|AVI|MOV|WEBM|SAG|GPG|PNG|JPEG|GIF";
    FileExtensionsEnum["Image"] = "jpg|jpeg|png|gif|svg|SAG|GPG|PNG|JPEG|GIF";
    FileExtensionsEnum["Video"] = "mp4|avi|mov|webm|MP4|AVI|MOV|WEBM";
})(FileExtensionsEnum = exports.FileExtensionsEnum || (exports.FileExtensionsEnum = {}));
var NotificationTypeEnum;
(function (NotificationTypeEnum) {
    NotificationTypeEnum["AddFriend"] = "add_friend";
    NotificationTypeEnum["AcceptFriend"] = "accept_friend";
    NotificationTypeEnum["SharePost"] = "share_post";
})(NotificationTypeEnum = exports.NotificationTypeEnum || (exports.NotificationTypeEnum = {}));
var NotificationRelatedTypeEnum;
(function (NotificationRelatedTypeEnum) {
    NotificationRelatedTypeEnum["Post"] = "post";
    NotificationRelatedTypeEnum["SharePost"] = "share_post";
})(NotificationRelatedTypeEnum = exports.NotificationRelatedTypeEnum || (exports.NotificationRelatedTypeEnum = {}));
//# sourceMappingURL=global.enum.js.map