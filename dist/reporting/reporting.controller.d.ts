import { Request, Response } from 'express';
import { DeleteReportDto, GetReportById, createReportingDto, updateReportingDto } from './dto/reporting.dto';
import { ReportingService } from './reporting.service';
export declare class ReportingController {
    private readonly reportingService;
    constructor(reportingService: ReportingService);
    addReport(file: any, dto: createReportingDto, req: Request, res: Response): Promise<any>;
    editReport(file: any, dto: updateReportingDto, req: Request, res: Response): Promise<any>;
    deleteReport(dto: DeleteReportDto, req: Request, res: Response): Promise<any>;
    reportHistory(req: Request, res: Response): Promise<any>;
    userReport(req: Request, res: Response, dto: GetReportById): Promise<any>;
}
