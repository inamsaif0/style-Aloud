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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../libs/database/entities/user.entity");
const user_addresses_entity_1 = require("../libs/database/entities/user-addresses.entity");
const constants_1 = require("../utils/guard/constants");
const email_sender_1 = require("../utils/helper/email-sender");
const path_1 = require("path");
const uuid_1 = require("uuid");
const pet_profile_entity_1 = require("../libs/database/entities/pet-profile.entity");
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
let UsersService = class UsersService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async signUp(dto, files) {
        if (dto.password != dto.confirm_password) {
            throw new common_1.HttpException('please enter the matched password', common_1.HttpStatus.BAD_REQUEST);
        }
        let allFiles = [];
        if (files) {
            files.media.forEach((val) => {
                let splitUrl = val === null || val === void 0 ? void 0 : val.mimetype.split('/');
                if (splitUrl[0] == 'video') {
                    allFiles.push({
                        file_id: (0, uuid_1.v4)(),
                        file_type: splitUrl[0],
                        filename: 'report-post/' + val.filename,
                        thumbnail: this.createVideoThumbnail(val),
                    });
                }
                if (splitUrl[0] != 'video') {
                    allFiles.push({
                        file_id: (0, uuid_1.v4)(),
                        file_type: splitUrl[0],
                        filename: 'report-post/' + val.filename,
                    });
                }
            });
        }
        const passwordHash = await bcrypt.hash(dto.password, 10);
        let users = await user_entity_1.Users.query().insertAndFetch({
            first_name: dto.first_name,
            last_name: dto.last_name,
            email: dto.email,
            password: passwordHash,
            role: dto.role,
            dob: dto.dob,
            phone_number: dto.phone_number,
            profile_picture: (allFiles === null || allFiles === void 0 ? void 0 : allFiles.length) > 0 ? JSON.stringify(allFiles) : null,
            device_token: dto.device_token,
            otp: '1234',
            active_role: dto.active_role
        });
        let objUser = {};
        objUser.token_type = constants_1.jwtConstants.token_type;
        objUser.token = this.jwtService.sign(users.toJSON());
        objUser.user_details = users;
        return objUser;
    }
    async generateResetToken() {
        return Math.floor(1000 + Math.random() * 9000);
    }
    async findOne(email, deviceToken) {
        let user = await user_entity_1.Users.query()
            .where({ email: email })
            .first();
        if (!user) {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.BAD_REQUEST);
        }
        let updateUser = await this.updateDeviceToken(user.id, deviceToken);
        return updateUser;
    }
    async updateDeviceToken(userId, deviceToken) {
        let user = await user_entity_1.Users.query().updateAndFetchById(userId, { device_token: deviceToken });
        return user;
    }
    async getUserById(dto, req) {
        let user = await user_entity_1.Users.query().findById(dto.id);
        if (!user) {
            throw new common_1.HttpException('user not found', common_1.HttpStatus.BAD_REQUEST);
        }
        return user;
    }
    async getAllUsers() {
        return await user_entity_1.Users.query();
    }
    async updateUser(dto, req, file) {
        let userObj = {};
        if (dto.first_name) {
            userObj.first_name = dto.first_name;
        }
        if (dto.last_name) {
            userObj.last_name = dto.last_name;
        }
        if (dto.gender) {
            userObj.gender = dto.gender;
        }
        if (dto.country) {
            userObj.country = dto.country;
        }
        if (dto.city) {
            userObj.city = dto.city;
        }
        if (dto.state) {
            userObj.state = dto.state;
        }
        if (dto.latitude) {
            userObj.latitude = dto.latitude;
        }
        if (dto.longitude) {
            userObj.longitude = dto.longitude;
        }
        if (dto.date_of_birth) {
            userObj.date_of_birth = dto.date_of_birth;
        }
        if (dto.phone_number) {
            userObj.phone_number = dto.phone_number;
        }
        if (file) {
            userObj.profile = 'user/' + file.filename;
        }
        let updatedUser = await user_entity_1.Users.query().updateAndFetchById(dto.id, userObj);
        console.log(updatedUser);
        return updatedUser;
    }
    async saveLocation(dto, req) {
        let addresses = new user_addresses_entity_1.UserAddresses();
        addresses.latitude = dto.latitude;
        addresses.longitude = dto.longitude;
        addresses.user_id = req.user.id;
        addresses.address = dto.address;
        addresses.title = dto.title;
        addresses.default = dto.default_address;
        let savedLocation = await user_addresses_entity_1.UserAddresses.query().insertAndFetch(addresses);
        return savedLocation;
    }
    async deleteLocation(dto) {
        let deletedLocation = await user_addresses_entity_1.UserAddresses.query().deleteById(dto.id);
        return deletedLocation;
    }
    async getAllLocation(req) {
        let SavedLocation = await user_addresses_entity_1.UserAddresses.query().where({ user_id: req.user.id }).orderBy('id', 'desc');
        return SavedLocation;
    }
    async sendOtp(otpDto) {
        let userExist = await user_entity_1.Users.query()
            .where({ email: otpDto.email })
            .first();
        if (!userExist) {
            throw new common_1.HttpException('email not found', common_1.HttpStatus.BAD_REQUEST);
        }
        let generateOtp = Math.floor(1000 + Math.random() * 9000);
        await user_entity_1.Users.query().updateAndFetchById(userExist.id, {
            otp: generateOtp,
        });
        await email_sender_1.EmailHelper.sendOtpEmail(otpDto.email, generateOtp);
        return 'check your email for otp';
    }
    async changePassword(changePasswordDto) {
        let userItem = await user_entity_1.Users.query()
            .where({ email: changePasswordDto.email })
            .first();
        if (!userItem) {
            throw new common_1.HttpException('email not found', common_1.HttpStatus.BAD_REQUEST);
        }
        if (userItem.otp != changePasswordDto.otp) {
            throw new common_1.HttpException('otp not match', common_1.HttpStatus.BAD_REQUEST);
        }
        const passwordHash = await bcrypt.hash(changePasswordDto.password, 10);
        return await user_entity_1.Users.query().updateAndFetchById(userItem.id, {
            password: passwordHash,
        });
    }
    createVideoThumbnail(val) {
        const name = val.originalname.split('.')[0];
        const randomName = Array(4).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
        ffmpeg({ source: (0, path_1.join)(__dirname, '../../', 'public/') + 'posts/' + val.filename })
            .thumbnail({ count: 1, filename: randomName + name + '.png', timemarks: [1], size: '320x320' }, (0, path_1.join)(__dirname, '../../', 'public/') + 'posts');
        return 'posts/' + randomName + name + '.png';
    }
    async addProfileDetails(dto, req, file) {
        let data = await pet_profile_entity_1.PetProfile.query().insert({
            user_id: dto.user_id,
            name: dto.name,
            type: dto.type,
            height: dto.height,
            weight: dto.weight,
            about: dto.about,
            breed: dto.breed,
            trait: dto.trait,
            gender: dto.gender,
            breeder: dto.breed,
            address: dto.address,
            longitude: dto.longitude,
            latitude: dto.latitude,
            price: dto.price,
            profile_image: 'user/' + file.filename
        });
        return data;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map