import { IsNotEmpty, IsOptional, isNotEmpty } from "class-validator";

export class CreateNotificationDto {}
export class SeenDto {
    @IsNotEmpty()
    notification_id: number;
  }
  
  export class NotificationDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    detail: string

    @IsOptional()
    image: string;

    @IsNotEmpty()
    type: string

    @IsNotEmpty()
    device_token: string


  }