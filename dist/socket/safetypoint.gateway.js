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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafetyPointGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const helper_global_1 = require("../utils/helper/helper.global");
let SafetyPointGateway = class SafetyPointGateway {
    async handleConnection(socket, ...args) {
        var _a;
        const header = socket.handshake.auth;
        if (header === null || header === void 0 ? void 0 : header.auth) {
            const user = await helper_global_1.Helper.changeUserStatus((_a = header === null || header === void 0 ? void 0 : header.auth) === null || _a === void 0 ? void 0 : _a.user_id, 1);
            return this.server.emit("user-connected", user);
        }
    }
    async handleDisconnect(client) {
        var _a;
        const header = client.handshake.auth;
        if (header === null || header === void 0 ? void 0 : header.auth) {
            const user = await helper_global_1.Helper.changeUserStatus((_a = header === null || header === void 0 ? void 0 : header.auth) === null || _a === void 0 ? void 0 : _a.user_id, 0);
            return this.server.emit("user-dis-connected", user);
        }
    }
    async postReport({ reportId, data }) {
        return this.server.emit('post-report-' + reportId, data);
    }
    async sentRequest({ receiverId, data }) {
        return this.server.emit('send-request-' + receiverId, data);
    }
    async cancelRequest({ receiverId, data, senderId }) {
        return this.server.emit('cancel-request' + receiverId + 'user-' + senderId, data);
    }
    async addFriend({ receiverId, data, senderId }) {
        return this.server.emit("add-friend-" + receiverId + "-user-" + senderId, data);
    }
    async unFriend({ data }) {
        return this.server.emit("unfriend-" + data.id, data);
    }
    async typing(data, socket) {
        return socket.broadcast.emit(`typing-${data.conversation_id}`, data);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], SafetyPointGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("typing"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], SafetyPointGateway.prototype, "typing", null);
SafetyPointGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: "petconnect",
        cors: '*',
        transports: ['websocket']
    }),
    (0, common_1.Injectable)()
], SafetyPointGateway);
exports.SafetyPointGateway = SafetyPointGateway;
//# sourceMappingURL=safetypoint.gateway.js.map