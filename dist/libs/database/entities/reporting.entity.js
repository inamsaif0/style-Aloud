"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reporting = void 0;
const sql_model_1 = require("../orm/sql.model");
const user_entity_1 = require("./user.entity");
class Reporting extends sql_model_1.Mapping {
    $formJson(json) {
        json = super.$formatJson(json);
        return json;
    }
    static get relationMappings() {
        return {
            user: {
                relation: sql_model_1.Mapping.BelongsToOneRelation,
                modelClass: user_entity_1.Users,
                join: {
                    from: 'reporting.user_id',
                    to: 'users.id'
                }
            }
        };
    }
}
exports.Reporting = Reporting;
Reporting.table = 'reporting';
//# sourceMappingURL=reporting.entity.js.map