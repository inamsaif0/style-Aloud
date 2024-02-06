export declare class CreateFriendDto {
    user_id: number;
}
export declare class AcceptRejectRequestDto {
    user_id: number;
    status: string;
}
export declare class CancelRequestDto {
    user_id: number;
    is_friend_id: number;
}
