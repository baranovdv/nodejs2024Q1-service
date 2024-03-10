import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from '../db/db.service';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { UserEntity } from '../db/entities/user';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DBService) {}

  getAllUsers(): UserEntity[] {
    const users = this.dbService.getAll('users');

    return users.map((user) => new UserEntity(user));
  }

  getOneUser(id: string): UserEntity {
    const user = this.dbService.getOne('users', id);

    if (user === undefined) {
      throw new NotFoundException('No such user');
    }

    return new UserEntity(user);
  }

  createUser(dto: CreateUserDto): UserEntity {
    const newUser = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    this.dbService.create('users', newUser);

    return new UserEntity(newUser);
  }

  updateUserPassword(id: string, dto: UpdatePasswordDto): UserEntity {
    const user = this.getOneUser(id);

    if (dto.oldPassword !== user.password) {
      throw new ForbiddenException('Wrong password');
    }

    user.password = dto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    const updateResult = this.dbService.update('users', id, user);

    if (!updateResult) {
      throw new NotFoundException('No such user');
    }

    return new UserEntity(user);
  }

  deleteUser(id: string): void {
    const deleteResult = this.dbService.delete('users', id);

    if (!deleteResult) {
      throw new NotFoundException('No such user');
    }
  }
}
