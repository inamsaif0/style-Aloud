import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Res, Req, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto, SeenDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/utils/guard/jwt-auth.guard';
import { STATUS_CODES } from 'http';
import { Request, Response } from 'express';

@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly NotificationsService: NotificationsService) { }

  @Post('/seen-single')
  @UseInterceptors(FileInterceptor(''))
  @UseGuards(JwtAuthGuard)
  async seenSingleNotification(
    @Req() req: Request,
    @Res() res: Response,
    @Body() seenDto: SeenDto
  ) {
    try {
      const data : any = await this.NotificationsService.seenSingleNotification(seenDto, req);
      if(!data){
        throw new HttpException('no data found', HttpStatus.NOT_FOUND)
      }

      return data;
    } catch (err) {
      console.log(err, 'error');
        return err
    }
  }

  @Post('/seen-multiple')
  @UseInterceptors(FileInterceptor(''))
  @UseGuards(JwtAuthGuard)
  async seenMultipleNotifications(
    @Req() req: Request,
    @Res() res: Response,
    @Body() SeenDto: SeenDto,
  ){
      try{
          const data =  await this.NotificationsService.seenMultipleNotifications(SeenDto, req)
          if(!data){
            throw new HttpException('no data found', HttpStatus.NOT_FOUND)
          }

      return data;

      }
      catch(err){
            console.log(err);
            return err;
      }
  }
}
