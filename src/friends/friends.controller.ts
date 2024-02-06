import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards, Req, Res, Query } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { AcceptRejectRequestDto, CancelRequestDto, CreateFriendDto } from './dto/create-friend.dto';
// import { JwtAuthGuard } from 'src/libs/guard/jwt-auth.guard';
import { JwtAuthGuard } from 'src/utils/guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
// import { ResponseHelper } from 'src/libs/helper/response.helper';
import { ResponseHelper } from 'src/utils/helper/response.helper';
import { Request, Response } from 'express';

@Controller('api/friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) { }


  // Add Friend

  @UseInterceptors(FileInterceptor(''))
  @UseGuards(JwtAuthGuard)
  @Post('/add-friend')
  async addFriend(
    @Body() dto: CreateFriendDto,
    @Req() req: Request,
    @Res() res: Response) {
      try{
        const friend = await this.friendsService.addFriend(dto, req);
        return ResponseHelper.success({ res, data:friend })

      }
      catch(error){
        return ResponseHelper.error({ res, req, error })

      }
        
  }
  // Un Friend


  // Accept Or Reject
  @UseInterceptors(FileInterceptor(''))
  @UseGuards(JwtAuthGuard)
  @Post('/request-response')
  async friendRequestResponse (@Body() acceptRejectRequestDto: AcceptRejectRequestDto, @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.friendsService.acceptRejectRequest(acceptRejectRequestDto, req);
      return ResponseHelper.success({ res, data })
    } catch (error) {
      return ResponseHelper.error({ res, req, error })
    }
  }


  // Cancel Request
  @UseInterceptors(FileInterceptor(''))
  @UseGuards(JwtAuthGuard)
  @Post('/cancel-request')
  async cancelRequest (@Body() cancelRequestDto: CancelRequestDto, @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.friendsService.cancelRequest(cancelRequestDto, req);
      return ResponseHelper.success({ res, data })
    } catch (error) {
      return ResponseHelper.error({ res, req, error })
    }
  }

  // List My Friends
  @UseGuards(JwtAuthGuard)
  @Get('/my-friends')
  async myFriends (@Query() query, @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.friendsService.myFriends({ req, query });
      return ResponseHelper.success({ res, data })
    } catch (error) {
      return ResponseHelper.error({ res, req, error })
    }
  }
  
  @UseGuards(JwtAuthGuard)
  @Get('/my-received-request')
  async myReceivedRequest (@Query() query, @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.friendsService.myReceivedRequest({ req, query });

      return ResponseHelper.success({ res, data })
    } catch (error) {
      return ResponseHelper.error({ res, req, error })
    }
  }

  // List Of Blocked Users 

  // My Send Request 
  @UseGuards(JwtAuthGuard)
  @Get('/my-sent-request')
  async mySentRequest (@Query() query, @Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.friendsService.mySentRequest({ req, query });
      return ResponseHelper.success({ res, data })
    } catch (error) {
      return ResponseHelper.error({ res, req, error })
    }
  }
  // Block User 
}
