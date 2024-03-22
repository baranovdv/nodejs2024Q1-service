import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from '../db/db.service';
import { ArtistEntity } from '../db/entities/entities';
import { CreateArtistDto, UpdateArtistdDto } from './dto/artist.dto';
import { TracksService } from '../tracks/tracks.service';
import { AlbumsService } from '../albums/albums.service';

const NO_SUCH_ITEM = 'No such artist';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly dbService: DBService,
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
  ) {}

  async getAllArtists(): Promise<ArtistEntity[]> {
    return this.dbService.artist.findMany();
  }

  async getOneArtist(id: string): Promise<ArtistEntity> {
    const artist = await this.dbService.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    return artist;
  }

  async createArtist(dto: CreateArtistDto): Promise<ArtistEntity> {
    const newArtist: ArtistEntity = {
      id: uuidv4(),
      ...dto,
    };

    const createdArtist = await this.dbService.artist.create({
      data: newArtist,
    });

    return createdArtist;
  }

  async updateArtist(id: string, dto: UpdateArtistdDto): Promise<ArtistEntity> {
    let artist = await this.dbService.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    artist = {
      ...artist,
      ...dto,
    };

    const updatedArtist = await this.dbService.artist.update({
      where: { id },
      data: artist,
    });

    if (!updatedArtist) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    return updatedArtist;
  }

  async deleteArtist(id: string): Promise<void> {
    try {
      await this.dbService.artist.delete({ where: { id } });
    } catch {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    // this.dbService.deleteFav('artist', id);
  }
}
