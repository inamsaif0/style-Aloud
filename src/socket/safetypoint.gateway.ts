import { Injectable } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// import { Helper } from '../libs/helper/helper.global';
import { Helper } from 'src/utils/helper/helper.global';
// import { GetReportsDto } from '../reporting/dto/reporting.dto';

@WebSocketGateway({
    namespace: "style",
    cors: '*',
    transports: ['websocket']
})
@Injectable()
export class SafetyPointGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    async handleConnection (socket: Socket, ...args: any[]) {
        const header = socket.handshake.auth;
        if (header?.auth) {
            const user = await Helper.changeUserStatus(header?.auth?.user_id, 1);
            return this.server.emit("user-connected", user);
        }
    }

    async handleDisconnect (client: Socket) {
        const header = client.handshake.auth;
        if (header?.auth) {
            const user = await Helper.changeUserStatus(header?.auth?.user_id, 0);
            return this.server.emit("user-dis-connected", user);
        }
    }

    async postReport ({reportId, data}) {
        return this.server.emit('post-report-' + reportId, data);
    }
    
    async sentRequest ({receiverId, data}){
        return this.server.emit('send-request-' + receiverId, data);
    }

    async cancelRequest ({receiverId, data, senderId}){
        return this.server.emit('cancel-request' + receiverId + 'user-' + senderId, data)
    }

    async addFriend ({ receiverId, data, senderId}) {
        return this.server.emit("add-friend-" + receiverId + "-user-" + senderId, data)
    }
    async unFriend ({data}):Promise<any> {
        return this.server.emit("unfriend-" + data.id, data);
    }
    @SubscribeMessage("typing")
    async typing (
      @MessageBody() data: any, @ConnectedSocket() socket: Socket) {
      return socket.broadcast.emit(`typing-${data.conversation_id}`, data);
    }
    
    // async userNotificationCount ({ receiverId }): Promise<any> {
    //     let count = await Helper.userUnreadNotificationCount(receiverId);
    //     return this.server.emit("user-notification-" + receiverId, count);
    // }
}   