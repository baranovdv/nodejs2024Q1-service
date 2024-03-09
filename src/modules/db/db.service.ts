import { Injectable } from '@nestjs/common';
import { User } from 'src/data/interfaces';
import { CreateUserDto } from '../users/dto/user.dto';
import { v4 as uuidv4 } from 'uuid';

const mockUser: User = {
  id: 'qwerty',
  login: 'userLogin',
  password: 'userPassword',
  version: 1,
  createdAt: 0,
  updatedAt: 0,
};

@Injectable()
export class DBService {
  private users: User[];

  constructor() {
    this.users = [mockUser];
  }

  getAllUsers(): User[] {
    return this.users;
  }

  getOneUser(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  createUser(dto: CreateUserDto): User {
    const newUser = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: 0,
      updatedAt: 0,
    };

    this.users.push(newUser);

    return newUser;
  }

  deleteUser(id: string): void {
    const userIndex = this.users.findIndex((user) => user.id === id);

    this.users.splice(userIndex, 1);
  }
}
