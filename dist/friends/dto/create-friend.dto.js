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
exports.CancelRequestDto = exports.AcceptRejectRequestDto = exports.CreateFriendDto = void 0;
const class_validator_1 = require("class-validator");
class CreateFriendDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateFriendDto.prototype, "user_id", void 0);
exports.CreateFriendDto = CreateFriendDto;
class AcceptRejectRequestDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AcceptRejectRequestDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(['accept', 'reject']),
    __metadata("design:type", String)
], AcceptRejectRequestDto.prototype, "status", void 0);
exports.AcceptRejectRequestDto = AcceptRejectRequestDto;
class CancelRequestDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CancelRequestDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CancelRequestDto.prototype, "is_friend_id", void 0);
exports.CancelRequestDto = CancelRequestDto;
//# sourceMappingURL=create-friend.dto.js.map