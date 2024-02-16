import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { NotificationFunction } from './notification-functions';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationFunction],
  // providers: [NotificationsService],

})
export class NotificationsModule {}
