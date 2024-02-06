import { FriendsService } from './friends.service';
import { AcceptRejectRequestDto, CancelRequestDto, CreateFriendDto } from './dto/create-friend.dto';
import { Request, Response } from 'express';
export declare class FriendsController {
    private readonly friendsService;
    constructor(friendsService: FriendsService);
    addFriend(dto: CreateFriendDto, req: Request, res: Response): Promise<any>;
    friendRequestResponse(acceptRejectRequestDto: AcceptRejectRequestDto, req: Request, res: Response): Promise<any>;
    cancelRequest(cancelRequestDto: CancelRequestDto, req: Request, res: Response): Promise<any>;
    myFriends(query: any, req: Request, res: Response): Promise<any>;
    myReceivedRequest(query: any, req: Request, res: Response): Promise<any>;
    mySentRequest(query: any, req: Request, res: Response): Promise<any>;
}
