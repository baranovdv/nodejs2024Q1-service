import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsEntity } from '../db/entities/entities';
import { FavsService } from './favorites.service';
import { FavsTypes } from 'src/data/types';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  getAllFavs(): FavsEntity {
    return this.favsService.getAllFavs();
  }

  @Post(':favsType/:id')
  add(
    @Param('favsType') favsType: FavsTypes,
    @Param('id', ParseUUIDPipe) id: string,
  ): string {
    return this.favsService.addFav(favsType, id);
  }

  @Delete(':favsType/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Param('favsType') favsType: FavsTypes,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.favsService.deleteFav(favsType, id);
  }
}
