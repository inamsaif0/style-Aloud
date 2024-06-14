import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Req, Res } from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { CreateFavouriteDto, DeleteFavouriteDto, GetFavouriteDto } from './dto/create-favourite.dto';
import { UpdateFavouriteDto } from './dto/update-favourite.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseHelper } from 'src/utils/helper/response.helper';

@Controller('api/favourite')
export class FavouriteController {
  constructor(private readonly favouriteService: FavouriteService) {}

  @UseInterceptors(FileInterceptor(''))
  @Post('/create-favourite')
  async createFavourite(@Body() createFavouriteDto: CreateFavouriteDto,  @Req() req: Request, @Res() res: Response) {
    try{
      let data = await this.favouriteService.createFavourite(createFavouriteDto);
      return ResponseHelper.success({ res, data })

    }catch(error){
      return ResponseHelper.error({ res, req, error })
    }
  }

  @UseInterceptors(FileInterceptor(''))
  @Post('/get-all-favourite')
  async getFavourite(@Body() getFavouriteDto: GetFavouriteDto,  @Req() req: Request, @Res() res: Response) {
    try{
      let data = await this.favouriteService.getFavourite(getFavouriteDto);
      return ResponseHelper.success({ res, data })

    }catch(error){
      return ResponseHelper.error({ res, req, error })
    }
  }

  @UseInterceptors(FileInterceptor(''))
  @Post('/delete-from-favourite')
  async deleteFavourite(@Body() deleteFavouriteDto: DeleteFavouriteDto,  @Req() req: Request, @Res() res: Response) {
    try{
      let data = await this.favouriteService.deleteFavourite(deleteFavouriteDto);
      return ResponseHelper.success({ res, data })

    }catch(error){
      return ResponseHelper.error({ res, req, error })
    }
  }

}
