import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from '../db/db.service';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { DBFieldsWithId } from 'src/data/types';
import { UserEntity } from '../db/entities/entities';

const ITEM_TYPE: DBFieldsWithId = 'users';
const NO_SUCH_ITEM = 'No such user';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DBService) {}

  getAllUsers(): UserEntity[] {
    const users = this.dbService.getAll(ITEM_TYPE);

    return users.map((user) => new UserEntity(user));
  }

  getOneUser(id: string): UserEntity {
    const user = this.dbService.getOne(ITEM_TYPE, id);

    if (user === undefined) {
      throw new NotFoundException(NO_SUCH_ITEM);
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

    this.dbService.create(ITEM_TYPE, newUser);

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

    const updateResult = this.dbService.update(ITEM_TYPE, id, user);

    if (!updateResult) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    return new UserEntity(user);
  }

  deleteUser(id: string): void {
    const deleteResult = this.dbService.delete(ITEM_TYPE, id);

    if (!deleteResult) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }
  }
}
