export declare class createReportingDto {
    priority: string;
    text: string;
    is_public: boolean;
    longitude: string;
    latitude: string;
    incident_id: Number;
}
export declare class updateReportingDto {
    id: string;
    priority: string;
    text: string;
    is_public: boolean;
    longitude: string;
    latitude: string;
    incident_id: Number;
}
export declare class GetReportsDto {
    user_id: number;
    latitude: string;
    longitude: string;
}
export declare class DeleteReportDto {
    id: number;
}
export declare class GetReportById {
    id: number;
}
