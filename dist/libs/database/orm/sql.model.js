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
var Mapping_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mapping = void 0;
const common_1 = require("@nestjs/common");
const objection_1 = require("objection");
var dotenv = require('dotenv');
dotenv.config();
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        timezone: process.env.UTC
    }
});
objection_1.Model.knex(knex);
let Mapping = Mapping_1 = class Mapping extends objection_1.Model {
    constructor() {
        super();
        Mapping_1.getCalledClassName = this.constructor;
    }
    static get tableName() {
        if (this.table) {
            this.tableNameCurrent = this.table;
        }
        return this.tableNameCurrent;
    }
    static async create(column) {
        let currentClass;
        currentClass = new this();
        currentClass = Object.assign(currentClass, column);
        var currentModel = this;
        return currentModel.query().insert(currentClass);
    }
    static update(column) {
        let currentClass;
        currentClass = new this();
        currentClass = Object.assign(currentClass, column);
        var currentModel = this;
        return currentModel.query().update(currentClass);
    }
    static async pagination(query, req = {}) {
        let params = req.query;
        let request = req.req;
        let data = {};
        const baseUrl = process.env.BASE_URL + request.route.path;
        let perPage = params.perPage ? Number(params.perPage) : 10;
        let currentPage = 0;
        let previous = null;
        let next = null;
        if (params.page) {
            currentPage = (params.page) ? (Number(params.page) - 1) : 0;
            previous = params.page != 1 ? (Number(params.page) - 1) : null;
        }
        data = await query.page(currentPage, perPage);
        const totalPages = Math.ceil(data.total / perPage);
        next = totalPages > 1 ? 2 : null;
        if (params.page) {
            next = totalPages > Number(params.page) ? (Number(params.page) + 1) : null;
        }
        data.page = Number(params.page);
        data.meta = {
            itemCount: 0,
            totalItems: data.total,
            itemsPerPage: perPage,
            totalPages: totalPages,
            currentPage: params.page ? Number(params.page) : 1
        };
        data.links = {
            first: baseUrl + "/?page=1&limit=" + perPage,
            previous: previous ? baseUrl + "/?page=" + previous + "&limit=" + perPage : null,
            next: next ? baseUrl + "/?page=" + next + "&limit=" + perPage : null,
            last: totalPages > 0 ? baseUrl + "/?page=" + totalPages + "&limit=" + perPage : null
        };
        return data;
    }
    static async findOneCustom(query) {
        let data = await query.first();
        return data ? data : null;
    }
    static async findAllCustom(query) {
        let data = {};
        data = await query;
        return data.length > 0 ? data : [];
    }
};
Mapping = Mapping_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], Mapping);
exports.Mapping = Mapping;
//# sourceMappingURL=sql.model.js.map