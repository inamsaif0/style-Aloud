import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
// import { JwtAuthGuard } from '../libs/guard/jwt-auth.guard';
import { JwtAuthGuard } from 'src/utils/guard/jwt-auth.guard';
// import { ResponseHelper } from '../libs/helper/response.helper';
import { ResponseHelper } from 'src/utils/helper/response.helper';
import { ChangePasswordDto, DeleteLocationDto, GetUserByIdDto, OtpDto, PetProfileDto, SignUpDto, UpdateProfileDto, savedLocationDto } from './dto/users.dto';
import { UsersService } from './users.service';
// import { InterceptorHelper } from 'src/libs/helper/interceptors/custom-files-interceptor';
import { InterceptorHelper } from 'src/utils/helper/interceptors/custom-files-interceptor';


@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // @UseInterceptors(FileInterceptor(''))
  @Post('/sign-up')
  @UseInterceptors(InterceptorHelper.globalFileInterceptorForImage('image', './public/user'))
  async signUp(
    @UploadedFile() file,
    @Body() signUpDto: SignUpDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      // console.log('hellow')
      // return req
      const data = await this.usersService.signUp(signUpDto, file);
      return ResponseHelper.success({ res, data })
    } catch (error) {
      return ResponseHelper.error({ res, req, error })
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-all-users')
  async getAllUsers( @Req() req: Request, @Res() res: Response ) {
    try {
      const users = await this.usersService.getAllUsers();
      return ResponseHelper.success({ res, data: users });
    } catch (error) {
      return ResponseHelper.error({ res, req, error });
    }
  }


  @UseGuards(JwtAuthGuard)
  @Post('/edit-user')
  @UseInterceptors(InterceptorHelper.globalFileInterceptorForImage('image', './public/user'))
  async editUser(
    @UploadedFile() file,
    @Body() dto: UpdateProfileDto,
    @Req() req: Request,
    @Res() res: Response

  ) {
    try {
      const updatedUser = await this.usersService.updateUser(dto, req, file);
      return ResponseHelper.success({ res, data: updatedUser });

    } catch (error) {
      return ResponseHelper.error({ res, req, error });

    }
  }


  @UseInterceptors(FileInterceptor(''))
  @UseGuards(JwtAuthGuard)
  @Post('/save-location')
  async saveLocation(
    @Body() dto: savedLocationDto,
    @Req() req: Request,
    @Res() res: Response

  ) {
    try {
      const data = await this.usersService.saveLocation(dto, req);
      return ResponseHelper.success({ res, data })
    } catch (error) {
      return ResponseHelper.error({ res, req, error })

    }
  }
  @UseGuards(JwtAuthGuard)
  @Get('/get-location')
  async getAllLocation
    (@Req() req: Request,
      @Res() res: Response
    ) {
    try {
      const SavedLocations = await this.usersService.getAllLocation(req);
      return ResponseHelper.success({ res, data: SavedLocations })

    } catch (error) {
      return ResponseHelper.error({ res, req, error })

    }

  }
  @Get('/get-location')
  async getData
    (@Req() req: Request,
      @Res() res: Response
    ) {
    try {
      const SavedLocations = await this.usersService.getAllLocation(req);
      return ResponseHelper.success({ res, data: SavedLocations })

    } catch (error) {
      return ResponseHelper.error({ res, req, error })

    }

  }
  @UseInterceptors(FileInterceptor(''))
  @UseGuards(JwtAuthGuard)
  @Post('/get-by-id')
  async getById(
    @Body() dto: GetUserByIdDto,
    @Req() req: Request,
    @Res() res: Response

  ) {
    try {
      const data = await this.usersService.getUserById(dto, req);
      return ResponseHelper.success({ res, data: data })
    } catch (error) {
      return ResponseHelper.error({ res, req, error })

    }
  }
  // sending otp to the email and setting token to the db 

  @UseInterceptors(FileInterceptor(''))
  @Post('/send-otp')
  async sendOtp(
    @Body() otpDto: OtpDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const data = await this.usersService.sendOtp(otpDto);
      return ResponseHelper.success({ res, data })
    } catch (error) {
      return ResponseHelper.error({ res, req, error })
    }
  }

  @UseInterceptors(FileInterceptor(''))
  @Post('/change-password')
  async changePassword (
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const data = await this.usersService.changePassword(changePasswordDto);
      return ResponseHelper.success({ res, data })
    } catch (error) {
      return ResponseHelper.error({ res, req, error })
    }
  }
  @UseInterceptors(FileInterceptor(''))
  @UseGuards(JwtAuthGuard)
  @Post('/delete-location-by-id')
  async deleteLocation(
    @Body() deleteLocationDto: DeleteLocationDto,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      let data = await this.usersService.deleteLocation(deleteLocationDto);
      return ResponseHelper.success({ res, data: data })

    } catch (error) {
      return ResponseHelper.error({ res, req, error })

    }
  }


  @UseInterceptors(InterceptorHelper.globalFileInterceptorForImage('image', './public/user'))
  @Post('/add-pet-details')
  async addPetDetails (
    @UploadedFile() file,
    @Body() PetProfileDto: PetProfileDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const data = await this.usersService.addProfileDetails(PetProfileDto, req, file);
      return ResponseHelper.success({ res, data })
    } catch (error) {
      return ResponseHelper.error({ res, req, error })
    }
  }

}