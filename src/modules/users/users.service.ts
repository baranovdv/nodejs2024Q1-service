import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { DBService } from '../db/db.service';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { DBUserType } from 'src/data/types';
import { UserEntity } from './entity/entity';

const NO_SUCH_ITEM = 'No such user';

@Injectable()
export class UsersService {
  constructor(private readonly dbService: DBService) {}

  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.dbService.user.findMany();

    return users.map((user) => new UserEntity(this.changeUserDateFromDB(user)));
  }

  async getOneUser(id: string): Promise<UserEntity> {
    const user = await this.dbService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    return new UserEntity(this.changeUserDateFromDB(user));
  }

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const newUser = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = await this.dbService.user.create({
      data: newUser,
    });

    return new UserEntity(this.changeUserDateFromDB(user));
  }

  async updateUserPassword(
    id: string,
    dto: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.dbService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    if (dto.oldPassword !== user.password) {
      throw new ForbiddenException('Wrong password');
    }

    user.password = dto.newPassword;
    user.version += 1;
    user.updatedAt = new Date();

    const updatedUser = await this.dbService.user.update({
      where: { id },
      data: user,
    });

    if (!updatedUser) {
      throw new NotFoundException(NO_SUCH_ITEM);
    }

    return new UserEntity(this.changeUserDateFromDB(updatedUser));
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.dbService.user.delete({ where: { id } });
    } catch {
      throw new NotFoundException(NO_SUCH_ITEM);
    }
  }

  changeUserDateFromDB(user: DBUserType): UserEntity {
    return {
      ...user,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    };
  }
}
