import { FAVS_TYPES } from './data';

export type DBFieldsWithId = 'users' | 'albums' | 'artists' | 'tracks';
export type DBFieldsWithoutId = 'favs';

export type DBFields = DBFieldsWithId | DBFieldsWithoutId;

export type FavsTypes = typeof FAVS_TYPES[number];
