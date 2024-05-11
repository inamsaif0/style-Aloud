import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNotificationDto, NotificationDto, SeenDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from 'src/libs/database/entities/notification.entity';
import { NotificationReceiver } from 'src/libs/database/entities/notification-receiver.entity';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { NotificationFunction } from './notification-functions';
import { GetUserByIdDto } from 'src/users/dto/users.dto';

@Injectable()
export class NotificationsService {
    EventEmitter: any;
    constructor(private readonly notificationFunctions: NotificationFunction) { }
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

    async sendNotificationToAll(notificationDto: NotificationDto, file)
    {
        
        // console.log(notificationDto)
        const data:any = await this.notificationFunctions.sendToAll({item: notificationDto, notificationTitle:notificationDto.title, type:notificationDto.type, file})
        return data;
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

    async getAllNotifications(params:any = {}){
        try {
            let query: any =  Notification.query();
            // Filter where title is not null
            // return queryFriend
            query.orderBy('id', 'desc'); // Order the query before pagination
            return await Notification.pagination(query, params);
        } catch (error) {
            // Handle any errors here
            console.error("Error in getAllNotifications:", error);
            throw error; // Re-throw the error to be caught by the caller
        }
        // return data;
    }
}
