import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  forwardRef,
} from '@nestjs/common';
import { DBService } from '../db/db.service';
import { DBFields, FavsTypes } from 'src/data/types';
import { TracksService } from '../tracks/tracks.service';
import { FavsEntity } from '../db/entities/entities';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';

const ITEM_TYPE: DBFields = 'favs';
const NO_SUCH_ITEM = 'No such';
const ITEM_IN_FAVS = 'already in favs';
const NO_SUCH_ENDPOINT = 'No such endpoint';
const ITEM_ADDED = 'was added to favorites';

@Injectable()
export class FavsService {
  constructor(
    private readonly dbService: DBService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => ArtistsService))
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => AlbumsService))
    private readonly albumsService: AlbumsService,
  ) {}

  getAllFavs(): FavsEntity {
    return this.dbService.getAll(ITEM_TYPE);
  }

  addFav(favsType: FavsTypes, id: string) {
    switch (favsType) {
      case 'track': {
        const track = this.tracksService.getOneTrack(id);

        if (!track) {
          throw new UnprocessableEntityException(`${NO_SUCH_ITEM} ${favsType}`);
        }

        const favs: FavsEntity = this.dbService.getAll(ITEM_TYPE);

        const favTrack = favs[`${favsType}s`].find((track) => track.id === id);

        if (favTrack) {
          throw new UnprocessableEntityException(`${favsType} ${ITEM_IN_FAVS}`);
        }

        this.dbService.addFav(favsType, track);

        return `${favsType} ${ITEM_ADDED}`;
      }

      case 'album': {
        const album = this.albumsService.getOneAlbum(id);

        if (!album) {
          throw new UnprocessableEntityException(`${NO_SUCH_ITEM} ${favsType}`);
        }

        const favs: FavsEntity = this.dbService.getAll(ITEM_TYPE);

        const favAlbum = favs[`${favsType}s`].find((album) => album.id === id);

        if (favAlbum) {
          throw new UnprocessableEntityException(`${favsType} ${ITEM_IN_FAVS}`);
        }

        this.dbService.addFav(favsType, album);

        return `${favsType} ${ITEM_ADDED}`;
      }

      case 'artist':
        const artist = this.artistsService.getOneArtist(id);

        if (!artist) {
          throw new UnprocessableEntityException(`${NO_SUCH_ITEM} ${favsType}`);
        }

        const favs: FavsEntity = this.dbService.getAll(ITEM_TYPE);

        const favArtist = favs[`${favsType}s`].find(
          (artist) => artist.id === id,
        );

        if (favArtist) {
          throw new UnprocessableEntityException(`${favsType} ${ITEM_IN_FAVS}`);
        }

        this.dbService.addFav(favsType, artist);
        return `${favsType} ${ITEM_ADDED}`;

      default: {
        throw new UnprocessableEntityException(NO_SUCH_ENDPOINT);
      }
    }
  }

  deleteFav(favsType: FavsTypes, id: string) {
    switch (favsType) {
      case 'track': {
        const favs: FavsEntity = this.dbService.getAll(ITEM_TYPE);

        const track = favs[`${favsType}s`].find((track) => track.id === id);

        if (!track) {
          throw new NotFoundException();
        }

        this.dbService.deleteFav(favsType, id);

        return;
      }

      case 'album': {
        const favs: FavsEntity = this.dbService.getAll(ITEM_TYPE);

        const album = favs[`${favsType}s`].find((album) => album.id === id);

        if (!album) {
          throw new NotFoundException();
        }

        this.dbService.deleteFav(favsType, id);

        return;
      }

      case 'artist': {
        const favs: FavsEntity = this.dbService.getAll(ITEM_TYPE);

        const artist = favs[`${favsType}s`].find((artist) => artist.id === id);

        if (!artist) {
          throw new NotFoundException();
        }

        this.dbService.deleteFav(favsType, id);

        return;
      }

      default: {
        throw new UnprocessableEntityException(NO_SUCH_ENDPOINT);
      }
    }
  }
}
