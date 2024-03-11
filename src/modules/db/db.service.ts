import { Injectable } from '@nestjs/common';
import { DBFields, DBFieldsWithId, FavsTypes } from 'src/data/types';
import {
  AlbumEntity,
  ArtistEntity,
  FavsEntity,
  TrackEntity,
  UserEntity,
} from './entities/entities';

// const mockUser: UserEntity = {
//   id: 'ef9ec01e-47ad-4811-aee4-7873ce2e78c1',
//   login: 'userLogin',
//   password: 'userPassword',
//   version: 1,
//   createdAt: 0,
//   updatedAt: 0,
// };

// const mockTrack: TrackEntity = {
//   id: 'id',
//   name: 'track',
//   artistId: 'qwert',
//   albumId: 'alb',
//   duration: 123,
// };

@Injectable()
export class DBService {
  private users: UserEntity[];
  private tracks: TrackEntity[];
  private artists: ArtistEntity[];
  private albums: AlbumEntity[];
  private favs: FavsEntity;

  constructor() {
    this.users = [];
    this.tracks = [];
    this.artists = [];
    this.albums = [];
    this.favs = {
      tracks: [],
      albums: [],
      artists: [],
    };
  }

  getAll(field: DBFields): any[] | any {
    return this[field];
  }

  getOne(field: DBFieldsWithId, id: string): Record<string, any> | undefined {
    const item: Record<string, any> | undefined = this[field as string].find(
      (item) => item.id === id,
    );

    return item;
  }

  create(field: DBFieldsWithId, data: any): boolean {
    this[field].push(data);

    return true;
  }

  update(field: DBFieldsWithId, id: string, data: any): boolean {
    const itemIndex = this[field].findIndex((item) => item.id === id);

    if (itemIndex < 0) return false;

    this[field][itemIndex] = data;

    return true;
  }

  delete(field: DBFieldsWithId, id: string): boolean {
    const itemIndex = this[field].findIndex((item) => item.id === id);

    if (itemIndex < 0) return false;

    this[field].splice(itemIndex, 1);

    return true;
  }

  addFav(favsType: FavsTypes, data: any) {
    this.favs[`${favsType}s`].push(data);
  }

  deleteFav(favsType: FavsTypes, id: string) {
    const itemIndex = this.favs[`${favsType}s`].findIndex(
      (item) => item.id === id,
    );

    // console.log(itemIndex);

    // console.log(this.favs[`${favsType}s`][itemIndex]);

    // console.log(this.favs);

    // this.favs[`${favsType}s`] = [];

    this.favs[`${favsType}s`].splice(itemIndex, 1);

    // console.log(this.favs);
  }
}
