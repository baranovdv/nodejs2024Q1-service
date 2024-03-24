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
import { CreateAlbumDto, UpdateAlbumdDto } from './dto/album.dto';
import { AlbumsService } from './albums.service';
import { Album } from '@prisma/client';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @Header('Content-Type', 'application/json')
  async getAllArtists(): Promise<Album[]> {
    return await this.albumsService.getAllAlbums();
  }

  @Get(':id')
  @Header('Content-Type', 'application/json')
  async getOneArtist(@Param('id', ParseUUIDPipe) id: string): Promise<Album> {
    return await this.albumsService.getOneAlbum(id);
  }

  @Post()
  @Header('Content-Type', 'application/json')
  async create(@Body() createAlbumDto: CreateAlbumDto): Promise<Album> {
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
