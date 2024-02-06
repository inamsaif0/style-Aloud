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
exports.ReportingService = void 0;
const common_1 = require("@nestjs/common");
const objection_1 = require("objection");
const reporting_entity_1 = require("../libs/database/entities/reporting.entity");
const safetypoint_gateway_1 = require("../socket/safetypoint.gateway");
let ReportingService = class ReportingService {
    constructor(safetyPoint) {
        this.safetyPoint = safetyPoint;
    }
    async addReport(dto, req, file) {
        let report = await reporting_entity_1.Reporting.query().insertAndFetch({
            user_id: req.user.id,
            priority: dto.priority,
            text: dto.text,
            is_public: dto.is_public,
            longitude: dto.longitude,
            latitude: dto.latitude,
            incident_id: dto.incident_id,
            images: file ? 'report/' + file.filename : null,
        });
        return report;
    }
    async editReport(dto, req, file) {
        let existingReport = await reporting_entity_1.Reporting.query().findById(req.body.id);
        let updatedReport = await reporting_entity_1.Reporting.query().updateAndFetchById(req.body.id, {
            priority: dto.priority,
            text: dto.text,
            is_public: dto.is_public,
            longitude: dto.longitude,
            latitude: dto.latitude,
            incident_id: dto.incident_id,
            images: file ? 'report/' + file.filename : existingReport,
        });
        return updatedReport;
    }
    async getAllReports(dto) {
        var _a, _b, _c;
        let postQuerySub;
        postQuerySub = reporting_entity_1.Reporting.query();
        postQuerySub.select('*', (0, objection_1.raw)(`( 6367 * ACOS( COS(RADIANS(${(_a = dto.latitude) !== null && _a !== void 0 ? _a : null})) * COS(RADIANS(latitude)) * COS(RADIANS(longitude) - RADIANS(${(_b = dto.longitude) !== null && _b !== void 0 ? _b : null})) + SIN(RADIANS(${(_c = dto.latitude) !== null && _c !== void 0 ? _c : null})) * SIN(RADIANS(latitude)) ) ) AS distance`));
        postQuerySub.having('distance', '<=', 5);
        postQuerySub.withGraphFetched('user');
        const result = await reporting_entity_1.Reporting.findAllCustom(postQuerySub);
        return result;
    }
    async deleteReport(dto) {
        const deletedReport = await reporting_entity_1.Reporting.query().deleteById(dto.id);
        return deletedReport;
    }
    async reportHistoryData(req) {
        const reportsHistory = await reporting_entity_1.Reporting.query().where({ user_id: req.user.id });
        return reportsHistory;
    }
    async gerUserReport(dto) {
        let Report;
        Report = reporting_entity_1.Reporting.query().where({ id: dto.id });
        Report.withGraphFetched('user');
        console.log(Report);
        return Report;
    }
};
ReportingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [safetypoint_gateway_1.SafetyPointGateway])
], ReportingService);
exports.ReportingService = ReportingService;
//# sourceMappingURL=reporting.service.js.map