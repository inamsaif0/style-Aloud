"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsController = void 0;
const common_1 = require("@nestjs/common");
const notifications_service_1 = require("./notifications.service");
const create_notification_dto_1 = require("./dto/create-notification.dto");
const platform_express_1 = require("@nestjs/platform-express");
const jwt_auth_guard_1 = require("../utils/guard/jwt-auth.guard");
const express_1 = require("express");
let NotificationsController = class NotificationsController {
    constructor(NotificationsService) {
        this.NotificationsService = NotificationsService;
    }
    async seenSingleNotification(req, res, seenDto) {
        try {
            const data = await this.NotificationsService.seenSingleNotification(seenDto, req);
            if (!data) {
                throw new common_1.HttpException('no data found', common_1.HttpStatus.NOT_FOUND);
            }
            return data;
        }
        catch (err) {
            console.log(err, 'error');
            return err;
        }
    }
    async seenMultipleNotifications(req, res, SeenDto) {
        try {
            const data = await this.NotificationsService.seenMultipleNotifications(SeenDto, req);
            if (!data) {
                throw new common_1.HttpException('no data found', common_1.HttpStatus.NOT_FOUND);
            }
            return data;
        }
        catch (err) {
            console.log(err);
            return err;
        }
    }
};
__decorate([
    (0, common_1.Post)('/seen-single'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object, create_notification_dto_1.SeenDto]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "seenSingleNotification", null);
__decorate([
    (0, common_1.Post)('/seen-multiple'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object, create_notification_dto_1.SeenDto]),
    __metadata("design:returntype", Promise)
], NotificationsController.prototype, "seenMultipleNotifications", null);
NotificationsController = __decorate([
    (0, common_1.Controller)('api/notifications'),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], NotificationsController);
exports.NotificationsController = NotificationsController;
//# sourceMappingURL=notifications.controller.js.map