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
var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = require("express");
const jwt_auth_guard_1 = require("../utils/guard/jwt-auth.guard");
const local_auth_guard_1 = require("../utils/guard/local-auth.guard");
const response_helper_1 = require("../utils/helper/response.helper");
const users_service_1 = require("../users/users.service");
const auth_service_1 = require("./auth.service");
const create_auth_dto_1 = require("./dto/create-auth.dto");
let AuthController = class AuthController {
    constructor(authService, usersService) {
        this.authService = authService;
        this.usersService = usersService;
    }
    async login(obj, req, res) {
        try {
            const data = await this.authService.login(req.user);
            return response_helper_1.ResponseHelper.success({ res, data });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async logOut(req, res) {
        try {
            const data = await this.authService.logOut(req);
            return response_helper_1.ResponseHelper.success({ res, data });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async saveNumber(dto, req, res) {
        try {
            const data = await this.authService.saveNumber(dto, req);
            return response_helper_1.ResponseHelper.success({ res, data });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async approve_otp(dto, req, res) {
        try {
            const data = await this.authService.approveOtp(dto, req);
            return response_helper_1.ResponseHelper.success({ res, data });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
};
__decorate([
    (0, common_1.Post)('/login'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.LogInDto, typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/logout'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logOut", null);
__decorate([
    (0, common_1.Post)('/save-number'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.PhoneNumberDto, typeof (_e = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _e : Object, typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "saveNumber", null);
__decorate([
    (0, common_1.Post)('/approve-otp'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.ApproveOtpDto, typeof (_g = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _g : Object, typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "approve_otp", null);
AuthController = __decorate([
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        users_service_1.UsersService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map