import { NotificationsService } from './notifications.service';
import { SeenDto } from './dto/create-notification.dto';
import { Request, Response } from 'express';
export declare class NotificationsController {
    private readonly NotificationsService;
    constructor(NotificationsService: NotificationsService);
    seenSingleNotification(req: Request, res: Response, seenDto: SeenDto): Promise<any>;
    seenMultipleNotifications(req: Request, res: Response, SeenDto: SeenDto): Promise<any>;
}
