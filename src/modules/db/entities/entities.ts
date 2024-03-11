import { Exclude } from 'class-transformer';

export class UserEntity {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}

export type TrackEntity = {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
};

export type ArtistEntity = {
  id: string;
  name: string;
  grammy: boolean;
};

export type AlbumEntity = {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
};

export type FavsEntity = {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
};
