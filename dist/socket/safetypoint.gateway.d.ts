import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class SafetyPointGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    handleConnection(socket: Socket, ...args: any[]): Promise<any>;
    handleDisconnect(client: Socket): Promise<any>;
    postReport({ reportId, data }: {
        reportId: any;
        data: any;
    }): Promise<any>;
    sentRequest({ receiverId, data }: {
        receiverId: any;
        data: any;
    }): Promise<any>;
    cancelRequest({ receiverId, data, senderId }: {
        receiverId: any;
        data: any;
        senderId: any;
    }): Promise<any>;
    addFriend({ receiverId, data, senderId }: {
        receiverId: any;
        data: any;
        senderId: any;
    }): Promise<any>;
    unFriend({ data }: {
        data: any;
    }): Promise<any>;
    typing(data: any, socket: Socket): Promise<any>;
}
