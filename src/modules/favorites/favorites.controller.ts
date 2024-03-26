import {
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavsService } from './favorites.service';
import { FavsTypes } from 'src/data/types';
import { FavsEntity } from '../db/entities/entities';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async getAllFavs(): Promise<FavsEntity> {
    return await this.favsService.getAllFavs();
  }

  @Post(':favsType/:id')
  async add(
    @Param('favsType') favsType: FavsTypes,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<string> {
    return this.favsService.addFav(favsType, id);
  }

  @Delete(':favsType/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('favsType') favsType: FavsTypes,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.favsService.deleteFav(favsType, id);
  }
}
