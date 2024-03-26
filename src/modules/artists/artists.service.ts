import { Injectable, NotFoundException } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { CreateArtistDto, UpdateArtistdDto } from './dto/artist.dto';
import { Artist } from '@prisma/client';

const NO_SUCH_ITEM = 'No such artist';

@Injectable()
export class ArtistsService {
  constructor(private readonly dbService: DBService) {}

  async getAllArtists(): Promise<Artist[]> {
    return this.dbService.artist.findMany();
  }

  async getOneArtist(id: string): Promise<Artist> {
    const artist = await this.dbService.artist.findUnique({
      where: { id },
    });

    if (!artist) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    return artist;
  }

  async createArtist(dto: CreateArtistDto): Promise<Artist> {
    const createdArtist = await this.dbService.artist.create({
      data: dto,
    });

    return createdArtist;
  }

  async updateArtist(id: string, dto: UpdateArtistdDto): Promise<Artist> {
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
