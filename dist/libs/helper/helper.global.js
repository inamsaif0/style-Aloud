"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Helper = void 0;
const objection_1 = require("objection");
const user_entity_1 = require("../database/entities/user.entity");
const reporting_entity_1 = require("../database/entities/reporting.entity");
class Helper {
    static async changeUserStatus(userId, status) {
        if (userId) {
            await user_entity_1.Users.query().updateAndFetchById(userId, { user_status: status });
            let user = await user_entity_1.Users.query().where({ id: userId }).first();
            return user ? user : null;
        }
        return null;
    }
    static async getAllReports(data) {
        var _a, _b, _c;
        let postQuerySub;
        postQuerySub = reporting_entity_1.Reporting.query();
        postQuerySub.select('*', (0, objection_1.raw)(`( 6367 * ACOS( COS(RADIANS(${(_a = data.latitude) !== null && _a !== void 0 ? _a : null})) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(${(_b = data.longitude) !== null && _b !== void 0 ? _b : null})) + SIN(RADIANS(${(_c = data.latitude) !== null && _c !== void 0 ? _c : null})) * SIN(RADIANS(latitude)) ) ) AS distance`));
        postQuerySub.having('distance', '<=', 500);
        postQuerySub.withGraphFetched('user');
        const result = await reporting_entity_1.Reporting.findAllCustom(postQuerySub);
        return result;
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