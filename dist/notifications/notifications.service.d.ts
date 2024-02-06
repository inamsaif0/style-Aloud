import { SeenDto } from './dto/create-notification.dto';
export declare class NotificationsService {
    EventEmitter: any;
    deleteMySingleNotification(seenDto: SeenDto, req: any): Promise<void>;
    seenSingleNotification(SeenDto: SeenDto, req: any): Promise<any>;
    seenMultipleNotifications(SeenDto: SeenDto, req: any): Promise<any>;
}
