import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from '../db/db.service';
import { AlbumEntity } from '../db/entities/entities';
import { CreateAlbumDto, UpdateAlbumdDto } from './dto/album.dto';
import { TracksService } from '../tracks/tracks.service';

const NO_SUCH_ITEM = 'No such album';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly dbService: DBService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
  ) {}

  async getAllAlbums(): Promise<AlbumEntity[]> {
    return await this.dbService.album.findMany();
  }

  async getOneAlbum(id: string): Promise<AlbumEntity> {
    const album = await this.dbService.album.findUnique({
      where: { id },
    });

    if (!album) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    return album;
  }

  async createAlbum(dto: CreateAlbumDto): Promise<AlbumEntity> {
    const newAlbum: AlbumEntity = {
      id: uuidv4(),
      ...dto,
    };

    const createdAlbum = await this.dbService.album.create({
      data: newAlbum,
    });

    return createdAlbum;
  }

  async updateAlbum(id: string, dto: UpdateAlbumdDto): Promise<AlbumEntity> {
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
