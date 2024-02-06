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
exports.ReportingController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../libs/guard/jwt-auth.guard");
const custom_files_interceptor_1 = require("../libs/helper/interceptors/custom-files-interceptor");
const response_helper_1 = require("../libs/helper/response.helper");
const reporting_dto_1 = require("./dto/reporting.dto");
const reporting_service_1 = require("./reporting.service");
const platform_express_1 = require("@nestjs/platform-express");
let ReportingController = class ReportingController {
    constructor(reportingService) {
        this.reportingService = reportingService;
    }
    async addReport(file, dto, req, res) {
        try {
            const data = await this.reportingService.addReport(dto, req, file);
            return response_helper_1.ResponseHelper.success({ res, data });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async editReport(file, dto, req, res) {
        try {
            const user = await this.reportingService.editReport(dto, req, file);
            return response_helper_1.ResponseHelper.success({ res, data: user });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async deleteReport(dto, req, res) {
        try {
            const deletedReport = await this.reportingService.deleteReport(dto);
            return response_helper_1.ResponseHelper.success({ res, data: deletedReport });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async reportHistory(req, res) {
        try {
            const reportsData = await this.reportingService.reportHistoryData(req);
            return response_helper_1.ResponseHelper.success({ res, data: reportsData });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
    async userReport(req, res, dto) {
        try {
            const userReport = await this.reportingService.gerUserReport(dto);
            return response_helper_1.ResponseHelper.success({ res, data: userReport });
        }
        catch (error) {
            return response_helper_1.ResponseHelper.error({ res, req, error });
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/add-report'),
    (0, common_1.UseInterceptors)(custom_files_interceptor_1.InterceptorHelper.globalFileInterceptorForImage('images', './public/report/')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, reporting_dto_1.createReportingDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "addReport", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('/edit-report'),
    (0, common_1.UseInterceptors)(custom_files_interceptor_1.InterceptorHelper.globalFileInterceptorForImage('images', './public/report/')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __param(3, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, reporting_dto_1.updateReportingDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "editReport", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    (0, common_1.Post)('/delete-report'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reporting_dto_1.DeleteReportDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "deleteReport", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('/get-report-history'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "reportHistory", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('')),
    (0, common_1.Post)('/get-report-by-id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, reporting_dto_1.GetReportById]),
    __metadata("design:returntype", Promise)
], ReportingController.prototype, "userReport", null);
ReportingController = __decorate([
    (0, common_1.Controller)('api/reporting'),
    __metadata("design:paramtypes", [reporting_service_1.ReportingService])
], ReportingController);
exports.ReportingController = ReportingController;
//# sourceMappingURL=reporting.controller.js.map