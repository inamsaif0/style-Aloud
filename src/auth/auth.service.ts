import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Users } from '../libs/database/entities/user.entity';
import { UsersService } from '../users/users.service';
// import { ShopifyService } from 'src/shopify/shopify.service';
import { ApproveOtpDto, GuestDto, PhoneNumberDto, ProfileInformationDto } from './dto/create-auth.dto';
import { PetProfile } from 'src/libs/database/entities/pet-profile.entity';
import { Guest } from 'src/libs/database/entities/guest.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    // private shopifyService: ShopifyService,
    private jwtService: JwtService
  ) { }


  async login(user: any) {
    const payload = { email: user.email, sub: user.id, };

    return {
      token_type: "Bearer",
      token: this.jwtService.sign(user),
      user_details: user
    };
  }
  async registerGuest(dto: GuestDto){
    let data:any = await Guest.query().insertAndFetch({
      device_token: dto.device_token
    }) 
    console.log('this guest is added and this is the data', data)
    return data
  }
  async validateUser(email: string, pass: string, deviceToken: string): Promise<any> {
    let user: any = await this.usersService.findOne(email, deviceToken);
    if (user && user.password && await bcrypt.compare(pass, user.password) == true) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  async logOut(req): Promise<any> {
    let userExist = await Users.query().where({ id: req.user.id }).first();
    if (!userExist) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    return await Users.query().updateAndFetchById(req.user.id, {
      device_token: null
    });
  }

  // saving 
  async saveNumber(dto: PhoneNumberDto, req): Promise<any> {
    let userExist = await Users.query().findById(req.user.id)

    if (!userExist) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    //it will generate a random number of length 4
    // let generateOtp = Math.floor(1000 + Math.random() * 9000);
    let generateOtp = 1234

    return await Users.query().updateAndFetchById(req.user.id, {
      phone_number: dto.phone_number,
      otp: generateOtp
    })
  }

  async approveOtp(dto: ApproveOtpDto, req): Promise<any> {
    let userExist: any = await Users.query().findById(req.user.id)

    if (!userExist) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }

    if (userExist.otp != dto.otp) {
      throw new HttpException('invalid otp', HttpStatus.BAD_REQUEST);
    }

    return await Users.query().updateAndFetchById(req.user.id, {
      is_verified: true
    })
  }





}
