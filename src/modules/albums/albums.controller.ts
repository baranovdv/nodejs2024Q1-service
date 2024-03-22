import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumEntity } from '../db/entities/entities';
import { CreateAlbumDto, UpdateAlbumdDto } from './dto/album.dto';
import { AlbumsService } from './albums.service';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async getAllTracks(): Promise<AlbumEntity[]> {
    return await this.albumsService.getAllAlbums();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  async getOneUser(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AlbumEntity> {
    return await this.albumsService.getOneAlbum(id);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    return await this.albumsService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  @Header('Content-Type', 'application/json')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumdDto,
  ) {
    return await this.albumsService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.albumsService.deleteAlbum(id);
  }
}
