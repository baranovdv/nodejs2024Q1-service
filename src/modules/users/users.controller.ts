import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { DBService } from '../db/db.service';
import { User } from 'src/data/interfaces';
import { CreateUserDto } from './dto/user.dto';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly dbService: DBService,
  ) {}

  @Get()
  getAllUsers(): User[] {
    return this.dbService.getAllUsers();
  }

  @Get(':id')
  getOneUser(@Param('id') id: string) {
    return this.dbService.getOneUser(id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.dbService.createUser(createUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.dbService.deleteUser(id);
  }
}
