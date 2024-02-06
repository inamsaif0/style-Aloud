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
exports.CheckoutDto = exports.CartItemDto = exports.CartDto = exports.AddToCartDto = exports.CollectionsDto = exports.ProductDto = void 0;
const class_validator_1 = require("class-validator");
class ProductDto {
}
exports.ProductDto = ProductDto;
class CollectionsDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CollectionsDto.prototype, "collectionId", void 0);
exports.CollectionsDto = CollectionsDto;
class AddToCartDto {
}
exports.AddToCartDto = AddToCartDto;
class CartDto {
}
exports.CartDto = CartDto;
class CartItemDto {
}
exports.CartItemDto = CartItemDto;
class CheckoutDto {
}
exports.CheckoutDto = CheckoutDto;
//# sourceMappingURL=create-shopify.dto.js.map