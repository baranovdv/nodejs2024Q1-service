import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from '../db/db.service';
import { DBFields } from 'src/data/types';
import { ArtistEntity } from '../db/entities/entities';
import { CreateArtistDto, UpdateArtistdDto } from './dto/artist.dto';
import { TracksService } from '../tracks/tracks.service';

const ITEM_TYPE: DBFields = 'artists';
const NO_SUCH_ITEM = 'No such artist';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly dbService: DBService,
    private readonly tracksService: TracksService,
  ) {}

  getAllArtists(): ArtistEntity[] {
    return this.dbService.getAll(ITEM_TYPE);
  }

  getOneArtist(id: string): ArtistEntity {
    const artist = this.dbService.getOne(ITEM_TYPE, id);

    if (artist === undefined) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    return artist as ArtistEntity;
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

    this.tracksService.deleteTrackByArtistId(id);
  }
}
