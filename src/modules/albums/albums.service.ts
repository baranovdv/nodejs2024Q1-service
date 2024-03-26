import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { CreateAlbumDto, UpdateAlbumdDto } from './dto/album.dto';
import { Album } from '@prisma/client';

const NO_SUCH_ITEM = 'No such album';

@Injectable()
export class AlbumsService {
  constructor(private readonly dbService: DBService) {}

  async getAllAlbums(): Promise<Album[]> {
    return await this.dbService.album.findMany();
  }

  async getOneAlbum(id: string): Promise<Album> {
    const album = await this.dbService.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    return album;
  }

  async createAlbum(dto: CreateAlbumDto): Promise<Album> {
    const createdAlbum = await this.dbService.album.create({
      data: dto,
    });

    return createdAlbum;
  }

  async updateAlbum(id: string, dto: UpdateAlbumdDto): Promise<Album> {
    let album = await this.dbService.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    album = {
      ...album,
      ...dto,
    };

    const updatedAlbum = await this.dbService.album.update({
      where: { id },
      data: album,
    });

    if (!updatedAlbum) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    return updatedAlbum;
  }

  async deleteAlbum(id: string): Promise<void> {
    try {
      await this.dbService.album.delete({ where: { id } });
    } catch {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    // this.dbService.deleteFav('album', id);
  }
}
