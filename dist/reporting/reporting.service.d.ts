import { Reporting } from 'src/libs/database/entities/reporting.entity';
import { SafetyPointGateway } from '../socket/safetypoint.gateway';
import { GetReportById, GetReportsDto, createReportingDto, updateReportingDto } from './dto/reporting.dto';
export declare class ReportingService {
    private readonly safetyPoint;
    constructor(safetyPoint: SafetyPointGateway);
    addReport(dto: createReportingDto, req: any, file: any): Promise<Reporting>;
    editReport(dto: updateReportingDto, req: any, file: any): Promise<any>;
    getAllReports(dto: GetReportsDto): Promise<any>;
    deleteReport(dto: any): Promise<number>;
    reportHistoryData(req: any): Promise<Reporting[]>;
    gerUserReport(dto: GetReportById): Promise<any>;
}
