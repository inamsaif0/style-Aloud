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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const express_1 = require("express");
const jwt_auth_guard_1 = require("../utils/guard/jwt-auth.guard");
const response_helper_1 = require("../utils/helper/response.helper");
const users_dto_1 = require("./dto/users.dto");
const users_service_1 = require("./users.service");
const custom_files_interceptor_1 = require("../utils/helper/interceptors/custom-files-interceptor");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async signUp(file, signUpDto, req, res) {
        try {
            const data = await this.usersService.signUp(signUpDto, file);
            return response_helper_1.ResponseHelper.success({ res, data });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async getAllUsers(req, res) {
        try {
            const users = await this.usersService.getAllUsers();
            return response_helper_1.ResponseHelper.success({ res, data: users });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async editUser(file, dto, req, res) {
        try {
            const updatedUser = await this.usersService.updateUser(dto, req, file);
            return response_helper_1.ResponseHelper.success({ res, data: updatedUser });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async saveLocation(dto, req, res) {
        try {
            const data = await this.usersService.saveLocation(dto, req);
            return response_helper_1.ResponseHelper.success({ res, data });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async getAllLocation(req, res) {
        try {
            const SavedLocations = await this.usersService.getAllLocation(req);
            return response_helper_1.ResponseHelper.success({ res, data: SavedLocations });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async getData(req, res) {
        try {
            const SavedLocations = await this.usersService.getAllLocation(req);
            return response_helper_1.ResponseHelper.success({ res, data: SavedLocations });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async getById(dto, req, res) {
        try {
            const data = await this.usersService.getUserById(dto, req);
            return response_helper_1.ResponseHelper.success({ res, data: data });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async sendOtp(otpDto, req, res) {
        try {
            const data = await this.usersService.sendOtp(otpDto);
            return response_helper_1.ResponseHelper.success({ res, data });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async changePassword(changePasswordDto, req, res) {
        try {
            const data = await this.usersService.changePassword(changePasswordDto);
            return response_helper_1.ResponseHelper.success({ res, data });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async deleteLocation(deleteLocationDto, req, res) {
        try {
            let data = await this.usersService.deleteLocation(deleteLocationDto);
            return response_helper_1.ResponseHelper.success({ res, data: data });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async addPetDetails(file, PetProfileDto, req, res) {
        try {
            const data = await this.usersService.addProfileDetails(PetProfileDto, req, file);
            return response_helper_1.ResponseHelper.success({ res, data });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
};
__decorate([
    (0, common_1.Post)('/sign-up'),
    (0, common_1.UseInterceptors)(custom_files_interceptor_1.InterceptorHelper.globalFileInterceptorForImage('image', './public/user')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_dto_1.SignUpDto, typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signUp", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/get-all-users'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/edit-user'),
    (0, common_1.UseInterceptors)(custom_files_interceptor_1.InterceptorHelper.globalFileInterceptorForImage('image', './public/user')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_dto_1.UpdateProfileDto, typeof (_e = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _e : Object, typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "editUser", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/save-location'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.savedLocationDto, typeof (_g = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _g : Object, typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "saveLocation", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/get-location'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_j = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _j : Object, typeof (_k = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _k : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllLocation", null);
__decorate([
    (0, common_1.Get)('/get-location'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_l = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _l : Object, typeof (_m = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _m : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getData", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/get-by-id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.GetUserByIdDto, typeof (_o = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _o : Object, typeof (_p = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _p : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getById", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    (0, common_1.Post)('/send-otp'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.OtpDto, typeof (_q = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _q : Object, typeof (_r = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _r : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "sendOtp", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    (0, common_1.Post)('/change-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.ChangePasswordDto, typeof (_s = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _s : Object, typeof (_t = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _t : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changePassword", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/delete-location-by-id'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.DeleteLocationDto, typeof (_u = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _u : Object, typeof (_v = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _v : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deleteLocation", null);
__decorate([
    (0, common_1.UseInterceptors)(custom_files_interceptor_1.InterceptorHelper.globalFileInterceptorForImage('image', './public/user')),
    (0, common_1.Post)('/add-pet-details'),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_dto_1.PetProfileDto, typeof (_w = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _w : Object, typeof (_x = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _x : Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "addPetDetails", null);
UsersController = __decorate([
    (0, common_1.Controller)('api/users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map