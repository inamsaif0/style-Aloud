"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupService = void 0;
const common_1 = require("@nestjs/common");
const childProcess = require("child_process");
const fs = require("fs-extra");
let BackupService = class BackupService {
    async createBackup() {
        const backupDir = './backup';
        const backupFileName = 'backup.sql';
        try {
            await fs.ensureDir(backupDir);
            const mysqldumpCommand = `mysqldump -u your-username -pyour-password your-database-name > ${backupDir}/${backupFileName}`;
            childProcess.execSync(mysqldumpCommand);
            return `${backupDir}/${backupFileName}`;
        }
        catch (error) {
            throw error;
        }
    }
};
BackupService = __decorate([
    (0, common_1.Injectable)()
], BackupService);
exports.BackupService = BackupService;
//# sourceMappingURL=backup.service.js.map