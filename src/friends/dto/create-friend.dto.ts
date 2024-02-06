import { IsIn, IsNotEmpty } from "class-validator";

export class CreateFriendDto {
    @IsNotEmpty()
    user_id: number;

  }
  export class AcceptRejectRequestDto {
    @IsNotEmpty()
    user_id: number;
  
    @IsNotEmpty()
    @IsIn(['accept', 'reject'])
    status: string;
  }
  
  export class CancelRequestDto {
    @IsNotEmpty()
    user_id: number;
  
    @IsNotEmpty()
    is_friend_id: number;
  }
  