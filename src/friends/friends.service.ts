import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AcceptRejectRequestDto, CancelRequestDto, CreateFriendDto } from './dto/create-friend.dto';
import {  Users } from 'src/libs/database/entities/user.entity';
import { Friends } from 'src/libs/database/entities/friends.entity';
// import { addFriendNotify } from '../notifications/notification-functions' 

@Injectable()
export class FriendsService {




async addFriend(dto: CreateFriendDto, req){
  let data:any = await Friends.query()
  .where({ receiver_id: dto.user_id, sender_id: req.user.id })
  .orWhere({receiver_id:req.user.id, sender_id:dto.user_id})
  .first();

  if(data){
    if(data.status == 'requested')
    {
      throw new HttpException('already requested', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    if(data.status == 'accept')
    {
      throw new HttpException('already friend', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }
    let friend: any;
    friend = new Friends();
    friend.receiver_id = dto.user_id;
    friend.sender_id = req.user.id;
    friend.status = 'requested';

    friend = await Friends.query().insertAndFetch(friend)
    // this.addFriend({})
    // addFriendNotify({senderId:req.user.id, item:friend, receiverId:dto.user_id, notificationTitle:'addFriend'})
    return friend;

}

async acceptRejectRequest (
  acceptRejectRequestDto: AcceptRejectRequestDto,
  req,
) {

  let request:any = await Friends.query().where({
    receiver_id: req.user.id,
    sender_id: acceptRejectRequestDto.user_id,
  }).first();

  // return request.id;

  if (!request) {
    throw new HttpException('Request not found', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  if (request.status == 'accept') {
    throw new HttpException('Already friend', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  let result: any = await Friends.query()

    .updateAndFetchById(request.id, {
      status: 'accept'
    });

  return result;
}


async myFriends (params: any = {}) {
  // return params.req.user.id
  let queryFriend: any = Friends.query();
  queryFriend.where({ sender_id: params.req.user.id, status: 'accept' });

  queryFriend.orderBy('id', 'desc');
  var myFriends = await Friends.pagination(queryFriend, params);
  for (const query of myFriends.results) {
    if (query.sender_id == params.req.user.id) {
      query.friend = await Users.query()
        .where('role', 'user')
        .findOne({ id: query.receiver_id });
    } else {
      query.friend = await Users.query()
        .where('role', 'user')
        .findOne({ id: query.sender_id });
    }
  }
  return myFriends;
}


async cancelRequest (cancelRequestDto: CancelRequestDto, req) {
  let requestItem: any = await Friends.query().where({ id: cancelRequestDto.is_friend_id }).first();
  if (!requestItem) {
    throw new HttpException('request not found', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  if (requestItem.status === 'accept') {
    throw new HttpException('already accepted request', HttpStatus.UNPROCESSABLE_ENTITY);
  }
  if (requestItem.receiver_id != cancelRequestDto.user_id) {
    throw new HttpException('receiver not found', HttpStatus.UNPROCESSABLE_ENTITY);
  }

  if (requestItem.sender_id != req.user.id) {
    throw new HttpException('sender not found', HttpStatus.UNPROCESSABLE_ENTITY);
  }

    await Friends.query().where({ id: requestItem.id }).del();
    let user: any = await Users.query().where({ 'role': 'user' }).where({ id: cancelRequestDto.user_id }).first();

    return user;
  

}

async myReceivedRequest (params: any = {}) {

  let queryFriend: any = Friends.query();
  queryFriend.where({ receiver_id: params.req.user.id, status: 'requested' });

  console.log(queryFriend, 'this is the data for relation with users table  ')
  queryFriend.orderBy('id', 'desc');
  return await Friends.pagination(queryFriend, params);
}

async mySentRequest (params: any = {}) {
  let queryFriend: any = Friends.query();
  queryFriend.where((qe) => {
    qe.where({ sender_id: params.req.user.id, status: 'requested' });
  });


  queryFriend.orderBy('id', 'desc');
  return await Friends.pagination(queryFriend, params);
}

}
function insertSingleNotification(arg0: {}) {
  throw new Error('Function not implemented.');
}

