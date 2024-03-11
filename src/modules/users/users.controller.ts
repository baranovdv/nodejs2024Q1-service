import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdatePasswordDto } from './dto/user.dto';
import { UserEntity } from '../db/entities/entities';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @Header('Content-Type', 'application/json')
  getAllUsers(): UserEntity[] {
    return this.usersService.getAllUsers();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @Header('Content-Type', 'application/json')
  getOneUser(@Param('id', ParseUUIDPipe) id: string): UserEntity {
    return this.usersService.getOneUser(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @Header('Content-Type', 'application/json')
  create(@Body() createUserDto: CreateUserDto): UserEntity {
    return this.usersService.createUser(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @Header('Content-Type', 'application/json')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    return this.usersService.updateUserPassword(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }
}
