"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const platform_express_1 = require("@nestjs/platform-express");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const sockets_module_1 = require("./socket/sockets.module");
const users_controller_1 = require("./users/users.controller");
const users_module_1 = require("./users/users.module");
const friends_module_1 = require("./friends/friends.module");
const notifications_module_1 = require("./notifications/notifications.module");
const shopify_module_1 = require("./shopify/shopify.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController, users_controller_1.UsersController,],
        providers: [app_service_1.AppService],
        imports: [
            platform_express_1.MulterModule.register({ dest: './public/' }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
                exclude: ['/api*'],
                serveRoot: '/public/'
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'client/build'),
            }),
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            auth_module_1.AuthModule, users_module_1.UsersModule, sockets_module_1.SocketsModule, friends_module_1.FriendsModule, notifications_module_1.NotificationsModule, shopify_module_1.ShopifyModule
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map