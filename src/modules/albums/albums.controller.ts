import {
  Body,
  Controller,
  Delete,
  Get,
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
  getAllTracks(): AlbumEntity[] {
    return this.albumsService.getAllAlbums();
  }

  @Get(':id')
  getOneUser(@Param('id', ParseUUIDPipe) id: string): AlbumEntity {
    return this.albumsService.getOneAlbum(id);
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto): AlbumEntity {
    return this.albumsService.createAlbum(createAlbumDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateAlbumDto: UpdateAlbumdDto,
  ) {
    return this.albumsService.updateAlbum(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.albumsService.deleteAlbum(id);
  }
}
