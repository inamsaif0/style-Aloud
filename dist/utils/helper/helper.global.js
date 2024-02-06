"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const user_entity_1 = require("../../libs/database/entities/user.entity");
class Helper {
    static async changeUserStatus(userId, status) {
        if (userId) {
            await user_entity_1.Users.query().updateAndFetchById(userId, { user_status: status });
            let user = await user_entity_1.Users.query().where({ id: userId }).first();
            return user ? user : null;
        }
        return null;
    }
    static async deviceTokenByUsers(userId) {
        let users = await user_entity_1.Users.query().where('id', userId).first();
        return users.device_token ? users.device_token : null;
    }
    static async multipleDeviceTokenByUsers({ ids }) {
        let userIds = await user_entity_1.Users.query().select("device_token").whereNotNull("device_token").findByIds(ids);
        return userIds;
    }
}
exports.Helper = Helper;
//# sourceMappingURL=helper.global.js.map