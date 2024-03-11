import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumEntity } from '../db/entities/entities';
import { CreateAlbumDto, UpdateAlbumdDto } from './dto/album.dto';
import { AlbumsService } from './albums.service';

const NO_SUCH_ITEM = 'No such album';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  getAllTracks(): AlbumEntity[] {
    return this.albumsService.getAllAlbums();
  }

  @Get(':id')
  getOneUser(@Param('id', ParseUUIDPipe) id: string): AlbumEntity {
    const album = this.albumsService.getOneAlbum(id);

    if (album === undefined) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    return album;
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
