import { IsNotEmpty } from "class-validator";

export class CreateNotificationDto {}
export class SeenDto {
    @IsNotEmpty()
    notification_id: number;
  }
  
  