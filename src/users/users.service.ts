import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { Users } from '../libs/database/entities/user.entity';
import { UserAddresses } from 'src/libs/database/entities/user-addresses.entity';
// import { jwtConstants } from '../libs/guard/constants';
import { jwtConstants } from 'src/utils/guard/constants';
import { ChangePasswordDto, DeleteLocationDto, OtpDto, PetProfileDto, SignUpDto, UpdateProfileDto, savedLocationDto } from './dto/users.dto';
import { randomBytes } from 'crypto';
// import { EmailHelper } from 'src/libs/helper/email-sender';
import { EmailHelper } from 'src/utils/helper/email-sender';
import { join } from 'path';
import { find } from 'lodash';
import { ShopifyService } from 'src/shopify/shopify.service';
import { v4 as uuid } from 'uuid';
import { PetProfile } from 'src/libs/database/entities/pet-profile.entity';
import axios from 'axios';
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);


@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    private shopifyService: ShopifyService
    ) { }

  async signUp(dto: SignUpDto, files) {
    // console.log(file)
    if (dto.password != dto.confirm_password) {
      throw new HttpException('please enter the matched password', HttpStatus.BAD_REQUEST);

    }
    let allFiles = [];
    if (files) {
      files.media.forEach((val) => {
        let splitUrl = val?.mimetype.split('/');
        if (splitUrl[0] == 'video') {
          allFiles.push({
            file_id: uuid(),
            file_type: splitUrl[0],
            filename: 'report-post/' + val.filename,
            thumbnail: this.createVideoThumbnail(val),
          });
        }
        if (splitUrl[0] != 'video') {
          allFiles.push({
            file_id: uuid(),
            file_type: splitUrl[0],
            filename: 'report-post/' + val.filename,
          });
        }
      });
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);
    let users: any = await Users.query().insertAndFetch({
      first_name: dto.first_name,
      last_name: dto.last_name,
      email: dto.email,
      password: passwordHash,
      role: dto.role,
      dob: dto.dob,
      phone_number: dto.phone_number,
      profile_picture: allFiles?.length > 0 ? JSON.stringify(allFiles) : null,
      device_token: dto.device_token,
      otp: '1234',
      active_role: dto.active_role
    });
    let Customer:any = await this.shopifyService.createCustomer(users)
    let objUser: any = {};
    objUser.token_type = jwtConstants.token_type;
    objUser.token = this.jwtService.sign(users.toJSON());
    objUser.user_details = users;
    return objUser;
  // }
  }
  // async signUp(dto: SignUpDto, files): Promise<any> {
  //   if (dto.password != dto.confirm_password) {
  //     throw new HttpException('Please enter matched passwords', HttpStatus.BAD_REQUEST);
  //   }

  //   // Register the customer in Shopify
  //   const shopifyApiKey = 'YOUR_SHOPIFY_API_KEY';
  //   const shopifyPassword = 'YOUR_SHOPIFY_PASSWORD';
  //   const shopifyStoreUrl = 'YOUR_SHOPIFY_STORE_URL';

  //   try {
  //     const shopifyCustomer = await axios.post(
  //       `https://${shopifyStoreUrl}/admin/api/2021-10/customers.json`,
  //       {
  //         customer: {
  //           first_name: dto.first_name,
  //           last_name: dto.last_name,
  //           email: dto.email,
  //           password: dto.password, // You may need to handle password encryption properly
  //         },
  //       },
  //       {
  //         auth: {
  //           username: shopifyApiKey,
  //           password: shopifyPassword,
  //         },
  //       },
  //     );

  //     // If customer registration in Shopify is successful, proceed with user registration in your application
  //     const passwordHash = await bcrypt.hash(dto.password, 10);
  //     let allFiles = [];

  //     // Process files if available
  //     if (files) {
  //       files.media.forEach((val) => {
  //         let splitUrl = val?.mimetype.split('/');
  //         if (splitUrl[0] == 'video') {
  //           allFiles.push({
  //             file_id: uuid(),
  //             file_type: splitUrl[0],
  //             filename: 'report-post/' + val.filename,
  //             thumbnail: this.createVideoThumbnail(val),
  //           });
  //         }
  //         if (splitUrl[0] != 'video') {
  //           allFiles.push({
  //             file_id: uuid(),
  //             file_type: splitUrl[0],
  //             filename: 'report-post/' + val.filename,
  //           });
  //         }
  //       });
  //     }

  //     // Insert user into your database
  //     let users: any = await Users.query().insertAndFetch({
  //       first_name: dto.first_name,
  //       last_name: dto.last_name,
  //       email: dto.email,
  //       password: passwordHash,
  //       role: dto.role,
  //       dob: dto.dob,
  //       phone_number: dto.phone_number,
  //       profile_picture: allFiles?.length > 0 ? JSON.stringify(allFiles) : null,
  //       device_token: dto.device_token,
  //       otp: '1234',
  //       active_role: dto.active_role,
  //     });

  //     // Generate JWT token
  //     let objUser: any = {};
  //     objUser.token_type = jwtConstants.token_type;
  //     objUser.token = this.jwtService.sign(users.toJSON());
  //     objUser.user_details = users;

  //     return objUser;
  //   } catch (error) {
  //     console.error('Error registering customer in Shopify:', error.response.data);
  //     throw new HttpException('Error registering customer in Shopify', HttpStatus.INTERNAL_SERVER_ERROR);
  //   }
  // }

  async generateResetToken() {
    return Math.floor(1000 + Math.random() * 9000);
  }




  async findOne(email: string, deviceToken: string) {
    let user: any = await Users.query()
      .where({ email: email })
      .first();
    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }


    let updateUser = await this.updateDeviceToken(user.id, deviceToken);
    return updateUser;
  }

  async updateDeviceToken(userId, deviceToken) {
    let user: any = await Users.query().updateAndFetchById(userId, { device_token: deviceToken })
    return user;
  }


  async getUserById(dto, req) {
    let user = await Users.query().findById(dto.id)


    if (!user) {
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async getAllUsers() {
    return await Users.query();

  }

  async updateUser(dto: UpdateProfileDto, req, file) {
    let userObj: any = {};
    if (dto.first_name) { userObj.first_name = dto.first_name }
    if (dto.last_name) { userObj.last_name = dto.last_name }
    if (dto.gender) { userObj.gender = dto.gender }
    if (dto.country) { userObj.country = dto.country }
    if (dto.city) { userObj.city = dto.city }
    if (dto.state) { userObj.state = dto.state }
    if (dto.latitude) { userObj.latitude = dto.latitude }
    if (dto.longitude) { userObj.longitude = dto.longitude }
    if (dto.date_of_birth) { userObj.date_of_birth = dto.date_of_birth }
    if (dto.phone_number) { userObj.phone_number = dto.phone_number }
    if (file) { userObj.profile = 'user/' + file.filename }   
    let updatedUser: any = await Users.query().updateAndFetchById(dto.id, userObj)
    console.log(updatedUser)
    return updatedUser;
  }

  async saveLocation(dto: savedLocationDto, req) {
    // let savedLocation:any = await Address.query().insertAndFetch()
    let addresses: any = new UserAddresses();
    addresses.latitude = dto.latitude;
    addresses.longitude = dto.longitude;
    addresses.user_id = req.user.id;
    addresses.address = dto.address;
    addresses.title = dto.title;
    addresses.default = dto.default_address;

    let savedLocation: any = await UserAddresses.query().insertAndFetch(addresses);
    return savedLocation;

  }

  async deleteLocation(dto: DeleteLocationDto) {
    let deletedLocation = await UserAddresses.query().deleteById(dto.id)
    return deletedLocation;

  }

  async getAllLocation(req) {
    let SavedLocation = await UserAddresses.query().where({ user_id: req.user.id }).orderBy('id', 'desc'); // Order by the 'id' column in ascending order;
    return SavedLocation;
  }

  async sendOtp(otpDto: OtpDto) {
    let userExist: any = await Users.query()
      .where({ email: otpDto.email })
      .first();
    if (!userExist) {
      throw new HttpException('email not found', HttpStatus.BAD_REQUEST);
    }
    let generateOtp = Math.floor(1000 + Math.random() * 9000);
    await Users.query().updateAndFetchById(userExist.id, {
      otp: generateOtp,
    });

    await EmailHelper.sendOtpEmail(otpDto.email, generateOtp);
    return 'check your email for otp';
  }
  async changePassword(changePasswordDto: ChangePasswordDto) {
    let userItem: any = await Users.query()
      .where({ email: changePasswordDto.email })
      .first();
    if (!userItem) {
      throw new HttpException('email not found', HttpStatus.BAD_REQUEST);
    }

    if (userItem.otp != changePasswordDto.otp) {
      throw new HttpException('otp not match', HttpStatus.BAD_REQUEST);
    }
    const passwordHash = await bcrypt.hash(changePasswordDto.password, 10);
    return await Users.query().updateAndFetchById(userItem.id, {
      password: passwordHash,
    });
  }

  createVideoThumbnail (val) {
    const name = val.originalname.split('.')[0];
    const randomName = Array(4).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
    ffmpeg({ source: join(__dirname, '../../', 'public/') + 'posts/' + val.filename })
      .thumbnail({ count: 1, filename: randomName + name + '.png', timemarks: [1], size: '320x320' },
        join(__dirname, '../../', 'public/') + 'posts',
      );
    return 'posts/' + randomName + name + '.png';
  }

  async  addProfileDetails(dto: PetProfileDto, req, file) {
    
    let data = await PetProfile.query().insert({
      user_id: dto.user_id,
      name: dto.name,
      type: dto.type,
      height: dto.height,
      weight: dto.weight,
      about: dto.about,
      breed: dto.breed,
      trait: dto.trait,
      gender: dto.gender,
      breeder: dto.breed,
      address: dto.address,
      longitude: dto.longitude,
      latitude: dto.latitude,
      price: dto.price,
      profile_image: 'user/' + file.filename
    })

    return data;
  }
}