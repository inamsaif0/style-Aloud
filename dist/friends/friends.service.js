"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendsService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../libs/database/entities/user.entity");
const friends_entity_1 = require("../libs/database/entities/friends.entity");
let FriendsService = class FriendsService {
    async addFriend(dto, req) {
        let data = await friends_entity_1.Friends.query()
            .where({ receiver_id: dto.user_id, sender_id: req.user.id })
            .orWhere({ receiver_id: req.user.id, sender_id: dto.user_id })
            .first();
        if (data) {
            if (data.status == 'requested') {
                throw new common_1.HttpException('already requested', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
            if (data.status == 'accept') {
                throw new common_1.HttpException('already friend', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
            }
        }
        let friend;
        friend = new friends_entity_1.Friends();
        friend.receiver_id = dto.user_id;
        friend.sender_id = req.user.id;
        friend.status = 'requested';
        friend = await friends_entity_1.Friends.query().insertAndFetch(friend);
        return friend;
    }
    async acceptRejectRequest(acceptRejectRequestDto, req) {
        let request = await friends_entity_1.Friends.query().where({
            receiver_id: req.user.id,
            sender_id: acceptRejectRequestDto.user_id,
        }).first();
        if (!request) {
            throw new common_1.HttpException('Request not found', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (request.status == 'accept') {
            throw new common_1.HttpException('Already friend', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        let result = await friends_entity_1.Friends.query()
            .updateAndFetchById(request.id, {
            status: 'accept'
        });
        return result;
    }
    async myFriends(params = {}) {
        let queryFriend = friends_entity_1.Friends.query();
        queryFriend.where({ sender_id: params.req.user.id, status: 'accept' });
        queryFriend.orderBy('id', 'desc');
        var myFriends = await friends_entity_1.Friends.pagination(queryFriend, params);
        for (const query of myFriends.results) {
            if (query.sender_id == params.req.user.id) {
                query.friend = await user_entity_1.Users.query()
                    .where('role', 'user')
                    .findOne({ id: query.receiver_id });
            }
            else {
                query.friend = await user_entity_1.Users.query()
                    .where('role', 'user')
                    .findOne({ id: query.sender_id });
            }
        }
        return myFriends;
    }
    async cancelRequest(cancelRequestDto, req) {
        let requestItem = await friends_entity_1.Friends.query().where({ id: cancelRequestDto.is_friend_id }).first();
        if (!requestItem) {
            throw new common_1.HttpException('request not found', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (requestItem.status === 'accept') {
            throw new common_1.HttpException('already accepted request', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (requestItem.receiver_id != cancelRequestDto.user_id) {
            throw new common_1.HttpException('receiver not found', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (requestItem.sender_id != req.user.id) {
            throw new common_1.HttpException('sender not found', common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        await friends_entity_1.Friends.query().where({ id: requestItem.id }).del();
        let user = await user_entity_1.Users.query().where({ 'role': 'user' }).where({ id: cancelRequestDto.user_id }).first();
        return user;
    }
    async myReceivedRequest(params = {}) {
        let queryFriend = friends_entity_1.Friends.query();
        queryFriend.where({ receiver_id: params.req.user.id, status: 'requested' });
        console.log(queryFriend, 'this is the data for relation with users table  ');
        queryFriend.orderBy('id', 'desc');
        return await friends_entity_1.Friends.pagination(queryFriend, params);
    }
    async mySentRequest(params = {}) {
        let queryFriend = friends_entity_1.Friends.query();
        queryFriend.where((qe) => {
            qe.where({ sender_id: params.req.user.id, status: 'requested' });
        });
        queryFriend.orderBy('id', 'desc');
        return await friends_entity_1.Friends.pagination(queryFriend, params);
    }
};
FriendsService = __decorate([
    (0, common_1.Injectable)()
], FriendsService);
exports.FriendsService = FriendsService;
function insertSingleNotification(arg0) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=friends.service.js.map