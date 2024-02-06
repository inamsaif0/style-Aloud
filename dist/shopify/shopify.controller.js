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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopifyController = void 0;
const common_1 = require("@nestjs/common");
const shopify_service_1 = require("./shopify.service");
let ShopifyController = class ShopifyController {
    constructor(shopifyService) {
        this.shopifyService = shopifyService;
    }
    async registerCustomer(customerData) {
        try {
            return await this.shopifyService.registerCustomer(customerData);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async authenticateCustomer(credentials) {
        try {
            return await this.shopifyService.authenticateCustomer(credentials);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async addToCart(customerId, product) {
        try {
            return await this.shopifyService.addToCart(customerId, product);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteFromCart(customerId, productId) {
        try {
            return await this.shopifyService.deleteFromCart(customerId, productId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async editCart(customerId, cartData) {
        try {
            return await this.shopifyService.editCart(customerId, cartData);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShopifyController.prototype, "registerCustomer", null);
__decorate([
    (0, common_1.Post)('authenticate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ShopifyController.prototype, "authenticateCustomer", null);
__decorate([
    (0, common_1.Post)('cart/:customerId/add'),
    __param(0, (0, common_1.Param)('customerId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShopifyController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Delete)('cart/:customerId/delete/:productId'),
    __param(0, (0, common_1.Param)('customerId')),
    __param(1, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ShopifyController.prototype, "deleteFromCart", null);
__decorate([
    (0, common_1.Patch)('cart/:customerId/edit'),
    __param(0, (0, common_1.Param)('customerId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ShopifyController.prototype, "editCart", null);
ShopifyController = __decorate([
    (0, common_1.Controller)('shopify'),
    __metadata("design:paramtypes", [shopify_service_1.ShopifyService])
], ShopifyController);
exports.ShopifyController = ShopifyController;
//# sourceMappingURL=shopify.controller.js.map