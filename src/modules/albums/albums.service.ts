import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from '../db/db.service';
import { DBFields } from 'src/data/types';
import { AlbumEntity } from '../db/entities/entities';
import { CreateAlbumDto, UpdateAlbumdDto } from './dto/album.dto';
import { TracksService } from '../tracks/tracks.service';

const ITEM_TYPE: DBFields = 'albums';
const NO_SUCH_ITEM = 'No such album';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly dbService: DBService,
    private readonly tracksService: TracksService,
  ) {}

  getAllAlbums(): AlbumEntity[] {
    return this.dbService.getAll(ITEM_TYPE);
  }

  getOneAlbum(id: string): AlbumEntity {
    const album = this.dbService.getOne(ITEM_TYPE, id);

    if (album === undefined) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    return album as AlbumEntity;
  }

  createAlbum(dto: CreateAlbumDto): AlbumEntity {
    const newAlbum: AlbumEntity = {
      id: uuidv4(),
      ...dto,
    };

    this.dbService.create(ITEM_TYPE, newAlbum);

    return newAlbum;
  }

  updateAlbum(id: string, dto: UpdateAlbumdDto): AlbumEntity {
    let album = this.getOneAlbum(id);

    album = {
      ...album,
      ...dto,
    };

    const updateResult = this.dbService.update(ITEM_TYPE, id, album);

    if (!updateResult) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    return album;
  }

  deleteAlbum(id: string): void {
    const deleteResult = this.dbService.delete(ITEM_TYPE, id);

    if (!deleteResult) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    this.tracksService.nullAlbumIdInTrackByArtistId(id);
  }

  nullArtistIdInAlbumByArtistId(id: string): void {
    const albums = this.getAllAlbums();

    const album = albums.find((album) => album.artistId === id);

    if (!album) return;

    this.updateAlbum(album.id, {
      ...album,
      artistId: null,
    });
  }
}
