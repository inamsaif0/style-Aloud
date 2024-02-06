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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsController = void 0;
const common_1 = require("@nestjs/common");
const friends_service_1 = require("./friends.service");
const create_friend_dto_1 = require("./dto/create-friend.dto");
const jwt_auth_guard_1 = require("../utils/guard/jwt-auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const response_helper_1 = require("../utils/helper/response.helper");
const express_1 = require("express");
let FriendsController = class FriendsController {
    constructor(friendsService) {
        this.friendsService = friendsService;
    }
    async addFriend(dto, req, res) {
        try {
            const friend = await this.friendsService.addFriend(dto, req);
            return response_helper_1.ResponseHelper.success({ res, data: friend });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async friendRequestResponse(acceptRejectRequestDto, req, res) {
        try {
            const data = await this.friendsService.acceptRejectRequest(acceptRejectRequestDto, req);
            return response_helper_1.ResponseHelper.success({ res, data });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async cancelRequest(cancelRequestDto, req, res) {
        try {
            const data = await this.friendsService.cancelRequest(cancelRequestDto, req);
            return response_helper_1.ResponseHelper.success({ res, data });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async myFriends(query, req, res) {
        try {
            const data = await this.friendsService.myFriends({ req, query });
            return response_helper_1.ResponseHelper.success({ res, data });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async myReceivedRequest(query, req, res) {
        try {
            const data = await this.friendsService.myReceivedRequest({ req, query });
            return response_helper_1.ResponseHelper.success({ res, data });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async mySentRequest(query, req, res) {
        try {
            const data = await this.friendsService.mySentRequest({ req, query });
            return response_helper_1.ResponseHelper.success({ res, data });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
};
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/add-friend'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_friend_dto_1.CreateFriendDto, typeof (_a = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _a : Object, typeof (_b = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "addFriend", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/request-response'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_friend_dto_1.AcceptRejectRequestDto, typeof (_c = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _c : Object, typeof (_d = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "friendRequestResponse", null);
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/cancel-request'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_friend_dto_1.CancelRequestDto, typeof (_e = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _e : Object, typeof (_f = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "cancelRequest", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/my-friends'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_g = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _g : Object, typeof (_h = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "myFriends", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/my-received-request'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_j = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _j : Object, typeof (_k = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _k : Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "myReceivedRequest", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/my-sent-request'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_l = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _l : Object, typeof (_m = typeof express_1.Response !== "undefined" && express_1.Response) === "function" ? _m : Object]),
    __metadata("design:returntype", Promise)
], FriendsController.prototype, "mySentRequest", null);
FriendsController = __decorate([
    (0, common_1.Controller)('api/friends'),
    __metadata("design:paramtypes", [friends_service_1.FriendsService])
], FriendsController);
exports.FriendsController = FriendsController;
//# sourceMappingURL=friends.controller.js.map