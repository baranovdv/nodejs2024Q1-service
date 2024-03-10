import { Injectable } from '@nestjs/common';
import { DBFields } from 'src/data/types';
import { UserEntity } from './entities/user';

const mockUser: UserEntity = {
  id: 'ef9ec01e-47ad-4811-aee4-7873ce2e78c1',
  login: 'userLogin',
  password: 'userPassword',
  version: 1,
  createdAt: 0,
  updatedAt: 0,
};

@Injectable()
export class DBService {
  private users: UserEntity[];

  constructor() {
    this.users = [mockUser];
  }

  getAll(field: DBFields): UserEntity[] {
    return this[field];
  }

  getOne(field: DBFields, id: string): Record<string, any> | undefined {
    const item: Record<string, any> | undefined = this[field].find(
      (item) => item.id === id,
    );

    return item;
  }

  create(field: DBFields, data: any): boolean {
    this[field].push(data);

    return true;
  }

  update(field: DBFields, id: string, data: any): boolean {
    const itemIndex = this[field].findIndex((item) => item.id === id);

    if (itemIndex < 0) return false;

    this[field][itemIndex] = data;

    return true;
  }

  delete(field: DBFields, id: string): boolean {
    const itemIndex = this[field].findIndex((item) => item.id === id);

    if (itemIndex < 0) return false;

    this[field].splice(itemIndex, 1);

    return true;
  }
}
