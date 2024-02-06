"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const sql_model_1 = require("../orm/sql.model");
class Users extends sql_model_1.Mapping {
    $formJson(json) {
        json = super.$formatJson(json);
        delete json.Body;
        return json;
    }
    static get relationMappings() {
        return {};
    }
}
exports.Users = Users;
Users.table = 'users';
//# sourceMappingURL=user.entity.js.map