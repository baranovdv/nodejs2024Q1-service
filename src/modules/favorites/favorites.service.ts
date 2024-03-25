import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { DBService } from '../db/db.service';
import { FavsTypes } from 'src/data/types';
import { FavsEntity } from '../db/entities/entities';

const NO_SUCH_ITEM = 'No such';
const NO_SUCH_ENDPOINT = 'No such endpoint';
const ITEM_ADDED = 'was added to favorites';

@Injectable()
export class FavsService {
  constructor(private readonly dbService: DBService) {}

  async getAllFavs(): Promise<FavsEntity> {
    const favs = await this.dbService.favorites.findUnique({
      where: { id: '1' },
      select: {
        artists: {
          select: {
            id: true,
            name: true,
            grammy: true,
          },
        },
        albums: {
          select: {
            id: true,
            name: true,
            year: true,
            artistId: true,
          },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
      },
    });

    if (!favs) {
      await this.dbService.favorites.create({
        data: {},
      });

      return { artists: [], albums: [], tracks: [] };
    }

    return favs;
  }

  async addFav(favsType: FavsTypes, id: string) {
    switch (favsType) {
      case 'track': {
        try {
          await this.dbService.favorites.update({
            where: { id: '1' },
            data: {
              tracks: {
                connect: { id },
              },
            },
          });
        } catch {
          throw new UnprocessableEntityException(`${NO_SUCH_ITEM} ${favsType}`);
        }

        return `${favsType} ${ITEM_ADDED}`;
      }

      case 'album': {
        try {
          await this.dbService.favorites.update({
            where: { id: '1' },
            data: {
              albums: {
                connect: { id },
              },
            },
          });
        } catch {
          throw new UnprocessableEntityException(`${NO_SUCH_ITEM} ${favsType}`);
        }

        return `${favsType} ${ITEM_ADDED}`;
      }

      case 'artist':
        try {
          await this.dbService.favorites.update({
            where: { id: '1' },
            data: {
              artists: {
                connect: { id },
              },
            },
          });
        } catch {
          throw new UnprocessableEntityException(`${NO_SUCH_ITEM} ${favsType}`);
        }

        return `${favsType} ${ITEM_ADDED}`;

      default: {
        throw new UnprocessableEntityException(NO_SUCH_ENDPOINT);
      }
    }
  }

  async deleteFav(favsType: FavsTypes, id: string) {
    switch (favsType) {
      case 'track': {
        try {
          await this.dbService.favorites.update({
            where: { id: '1' },
            data: {
              tracks: {
                disconnect: { id },
              },
            },
          });
        } catch {
          throw new UnprocessableEntityException(`${NO_SUCH_ITEM} ${favsType}`);
        }

        return `${favsType} ${ITEM_ADDED}`;
      }

      case 'album': {
        try {
          await this.dbService.favorites.update({
            where: { id: '1' },
            data: {
              albums: {
                disconnect: { id },
              },
            },
          });
        } catch {
          throw new UnprocessableEntityException(`${NO_SUCH_ITEM} ${favsType}`);
        }

        return `${favsType} ${ITEM_ADDED}`;
      }

      case 'artist':
        try {
          await this.dbService.favorites.update({
            where: { id: '1' },
            data: {
              artists: {
                disconnect: { id },
              },
            },
          });
        } catch {
          throw new UnprocessableEntityException(`${NO_SUCH_ITEM} ${favsType}`);
        }

        return `${favsType} ${ITEM_ADDED}`;

      default: {
        throw new UnprocessableEntityException(NO_SUCH_ENDPOINT);
      }
    }
  }
}
