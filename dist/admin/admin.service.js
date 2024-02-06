"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../libs/database/entities/user.entity");
let AdminService = class AdminService {
    async allUsers(data = {}) {
        let result = {};
        let allUsersQuery = {};
        allUsersQuery = user_entity_1.Users.query();
        allUsersQuery.where('role', 'user');
        allUsersQuery.orderBy('id', 'desc');
        result = await user_entity_1.Users.pagination(allUsersQuery, data);
        return result;
    }
    async allAdmins(data = {}) {
        let result = {};
        let allUsersQuery = {};
        allUsersQuery = user_entity_1.Users.query();
        allUsersQuery.where('role', 'admin');
        allUsersQuery.orderBy('id', 'desc');
        result = await user_entity_1.Users.pagination(allUsersQuery, data);
        return result;
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)()
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map