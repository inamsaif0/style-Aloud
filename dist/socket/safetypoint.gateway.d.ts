import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class SafetyPointGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    handleConnection(socket: Socket, ...args: any[]): Promise<boolean>;
    handleDisconnect(client: Socket): Promise<boolean>;
    postReport({ reportId, data }: {
        reportId: any;
        data: any;
    }): Promise<boolean>;
    sentRequest({ receiverId, data }: {
        receiverId: any;
        data: any;
    }): Promise<boolean>;
    cancelRequest({ receiverId, data, senderId }: {
        receiverId: any;
        data: any;
        senderId: any;
    }): Promise<boolean>;
    addFriend({ receiverId, data, senderId }: {
        receiverId: any;
        data: any;
        senderId: any;
    }): Promise<boolean>;
    unFriend({ data }: {
        data: any;
    }): Promise<any>;
    typing(data: any, socket: Socket): Promise<boolean>;
}
