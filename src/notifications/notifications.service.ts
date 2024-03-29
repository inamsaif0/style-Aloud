import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNotificationDto, SeenDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from 'src/libs/database/entities/notification.entity';
import { NotificationReceiver } from 'src/libs/database/entities/notification-receiver.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class NotificationsService {
    EventEmitter: any;
    // this will be use to add notifications in the notification table

    // send notification

    // function  
    async deleteMySingleNotification(seenDto: SeenDto, req) {
        let queryNotification: any = await Notification.query()
            .where("id", seenDto.notification_id)
            .withGraphFetched("receiver_notification")
            .modifyGraph('receiver_notification', (builder) => {
                builder.where('receiver_id', req.user.id);
            }).first();

        if (!queryNotification) {
            throw new HttpException('Notification not found', HttpStatus.NOT_FOUND)
        }

        await NotificationReceiver.query()
        .where('id', queryNotification.received_notification.id)
        .delete();
    }


    async seenSingleNotification(SeenDto: SeenDto, req){
        let query :any = await Notification.query()
        .where('id', SeenDto.notification_id)
        .withGraphFetched('received_notification')
        .modifyGraph('received_notification', (builder) => {
            builder.where('received_id', req.user.id);
        })
        .first();
        // console.log(query);
        // return query;
        if(!query) {
            throw new HttpException('Notification not Found ', HttpStatus.NOT_FOUND)
        }

        NotificationReceiver.query()
        .updateAndFetchById(query.received_notification.id,{
            is_seen: true
        })

        return query;
    }

    async seenMultipleNotifications(SeenDto: SeenDto, req){
        let query : any = await Notification.query()
        .where('id', SeenDto.notification_id)
        .withGraphFetched('received_notification')
        .modifyGraph('received_notification', (builder) => {
            builder.where('receiver_id', req.user.id);
        }).first();
        
        // this.EventEmitter.emit('send-multiple-notifications', query)

        return query;
    }
}
