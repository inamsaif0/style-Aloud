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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../libs/database/entities/user.entity");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id, };
        return {
            token_type: "Bearer",
            token: this.jwtService.sign(user),
            user_details: user
        };
    }
    async validateUser(email, pass, deviceToken) {
        let user = await this.usersService.findOne(email, deviceToken);
        if (user && user.password && await bcrypt.compare(pass, user.password) == true) {
            const { password } = user, result = __rest(user, ["password"]);
            return result;
        }
        return null;
    }
    async logOut(req) {
        let userExist = await user_entity_1.Users.query().where({ id: req.user.id }).first();
        if (!userExist) {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.BAD_REQUEST);
        }
        return await user_entity_1.Users.query().updateAndFetchById(req.user.id, {
            device_token: null
        });
    }
    async saveNumber(dto, req) {
        let userExist = await user_entity_1.Users.query().findById(req.user.id);
        if (!userExist) {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.BAD_REQUEST);
        }
        let generateOtp = 1234;
        return await user_entity_1.Users.query().updateAndFetchById(req.user.id, {
            phone_number: dto.phone_number,
            otp: generateOtp
        });
    }
    async approveOtp(dto, req) {
        let userExist = await user_entity_1.Users.query().findById(req.user.id);
        if (!userExist) {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.BAD_REQUEST);
        }
        if (userExist.otp != dto.otp) {
            throw new common_1.HttpException('invalid otp', common_1.HttpStatus.BAD_REQUEST);
        }
        return await user_entity_1.Users.query().updateAndFetchById(req.user.id, {
            is_verified: true
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map