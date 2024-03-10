import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/data/interfaces';
import { DBService } from '../db/db.service';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DBService) {}

  getAllUsers(): User[] {
    return this.dbService.getAll('users');
  }

  getOneUser(id: string): User {
    const user = this.dbService.getOne('users', id);

    if (user === undefined) {
      throw new NotFoundException('No such user');
    }

    return user as User;
  }

  createUser(dto: CreateUserDto): User {
    const newUser = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.dbService.create('users', newUser);

    return newUser;
  }

  updateUserPassword(id: string, dto: UpdatePasswordDto): User {
    const user = this.getOneUser(id);

    if (dto.oldPassword !== user.password) {
      throw new ForbiddenException('Wrong password');
    }

    user.password = dto.newPassword;

    const updateResult = this.dbService.update('users', id, user);

    if (!updateResult) {
      throw new NotFoundException('No such user');
    }

    return user;
  }

  deleteUser(id: string): void {
    const deleteResult = this.dbService.delete('users', id);

    if (!deleteResult) {
      throw new NotFoundException('No such user');
    }
  }
}
