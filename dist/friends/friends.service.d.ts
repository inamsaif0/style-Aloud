import { AcceptRejectRequestDto, CancelRequestDto, CreateFriendDto } from './dto/create-friend.dto';
export declare class FriendsService {
    addFriend(dto: CreateFriendDto, req: any): Promise<any>;
    acceptRejectRequest(acceptRejectRequestDto: AcceptRejectRequestDto, req: any): Promise<any>;
    myFriends(params?: any): Promise<any>;
    cancelRequest(cancelRequestDto: CancelRequestDto, req: any): Promise<any>;
    myReceivedRequest(params?: any): Promise<any>;
    mySentRequest(params?: any): Promise<any>;
}
