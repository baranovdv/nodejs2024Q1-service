import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from '../db/db.service';
import { DBFieldsWithId } from 'src/data/types';
import { ArtistEntity } from '../db/entities/entities';
import { CreateArtistDto, UpdateArtistdDto } from './dto/artist.dto';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';

const ITEM_TYPE: DBFieldsWithId = 'artists';
const NO_SUCH_ITEM = 'No such artist';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly dbService: DBService,
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
  ) {}

  getAllArtists(): ArtistEntity[] {
    return this.dbService.getAll(ITEM_TYPE);
  }

  getOneArtist(id: string): ArtistEntity {
    return this.dbService.getOne(ITEM_TYPE, id) as ArtistEntity | undefined;
  }

  createArtist(dto: CreateArtistDto): ArtistEntity {
    const newArtist: ArtistEntity = {
      id: uuidv4(),
      ...dto,
    };

    this.dbService.create(ITEM_TYPE, newArtist);

    return newArtist;
  }

  updateArtist(id: string, dto: UpdateArtistdDto): ArtistEntity {
    let artist = this.getOneArtist(id);

    artist = {
      ...artist,
      ...dto,
    };

    const updateResult = this.dbService.update(ITEM_TYPE, id, artist);

    if (!updateResult) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    return artist;
  }

  deleteArtist(id: string): void {
    const deleteResult = this.dbService.delete(ITEM_TYPE, id);

    if (!deleteResult) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    this.tracksService.nullArtistIdInTrackByArtistId(id);
    this.albumsService.nullArtistIdInAlbumByArtistId(id);
  }
}
