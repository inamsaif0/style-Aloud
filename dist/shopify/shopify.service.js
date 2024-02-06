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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShopifyService = void 0;
require("@shopify/shopify-api/adapters/node");
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const shopify_api_1 = require("@shopify/shopify-api");
const config_1 = require("@nestjs/config");
let ShopifyService = class ShopifyService {
    constructor(configService) {
        this.configService = configService;
        this.shopifyApiUrl = 'https://e102b127e425a798ff2782d6314f18b7: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@fabricforu.myshopify.com/admin/api/2022-10';
        this.axiosInstance = axios_1.default.create({
            baseURL: this.shopifyApiUrl,
            timeout: 5000,
        });
        this.initializeShopifyApi();
    }
    initializeShopifyApi() {
        this.shopify = (0, shopify_api_1.shopifyApi)({
            apiKey: 'e102b127e425a798ff2782d6314f18b7',
            apiSecretKey: '514ed82d68546411ae191b6ac5391335',
            scopes: ['read_products', 'update_products', 'delete_products'],
            hostName: 'fabricforu.myshopify.com',
            apiVersion: shopify_api_1.LATEST_API_VERSION,
            isEmbeddedApp: false,
        });
    }
    getShopify() {
        return this.shopify;
    }
    async getCollections() {
        const response = await this.axiosInstance.get(`/smart_collections.json`);
        return response.data;
    }
    async getCollectionsProducts(dto) {
        const response = await this.axiosInstance.get(`/collections/${dto.collectionId}/products.json`);
        return response.data;
    }
    async authenticateCustomer(credentials) {
    }
    async registerCustomer(customerData) {
        try {
            const query = `mutation {
        customerCreate(input: {firstName: "${customerData.firstName}", lastName: "${customerData.lastName}", email: "${customerData.email}"}) {
          customer {
            id
            email
            firstName
            lastName
          }
          userErrors {
            field
            message
          }
        }
      }`;
            const response = await this.shopify.send(query);
            return response;
        }
        catch (error) {
            throw new Error(error.response.errors);
        }
    }
    async addToCart(customerId, product) {
        try {
            const query = `mutation {
        checkoutLineItemsAdd(checkoutId: "${customerId}", lineItems: {quantity: ${product.quantity}, variantId: "${product.variantId}"}) {
          checkout {
            id
            webUrl
          }
          checkoutUserErrors {
            code
            field
            message
          }
        }
      }`;
            const response = await this.shopify.send(query);
            return response;
        }
        catch (error) {
            throw new Error(error.response.errors);
        }
    }
    async deleteFromCart(customerId, productId) {
        try {
            const query = `mutation {
        checkoutLineItemsRemove(checkoutId: "${customerId}", lineItemIds: ["${productId}"]) {
          checkout {
            id
          }
          checkoutUserErrors {
            code
            field
            message
          }
        }
      }`;
            const response = await this.shopify.send(query);
            return response;
        }
        catch (error) {
            throw new Error(error.response.errors);
        }
    }
    async editCart(customerId, cartData) {
        try {
            const lineItems = cartData.lineItems.map((item) => `{quantity: ${item.quantity}, variantId: "${item.variantId}"}`).join(', ');
            const query = `mutation {
        checkoutLineItemsReplace(checkoutId: "${customerId}", lineItems: [${lineItems}]) {
          checkout {
            id
          }
          checkoutUserErrors {
            code
            field
            message
          }
        }
      }`;
            const response = await this.shopify.send(query);
            return response;
        }
        catch (error) {
            throw new Error(error.response.errors);
        }
    }
};
ShopifyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], ShopifyService);
exports.ShopifyService = ShopifyService;
//# sourceMappingURL=shopify.service.js.map