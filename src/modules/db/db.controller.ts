// import { Controller } from '@nestjs/common';
// import { DBService } from './db.service';
// import { User } from 'src/data/interfaces';
// import { CreateUserDto, UpdatePasswordDto } from '../users/dto/user.dto';

// @Controller()
// export class DBController {
//   constructor(private readonly dbService: DBService) {}

//   getAllUsers(): User[] {
//     return this.dbService.getAllUsers();
//   }

//   getOneUser(id: string): User {
//     return this.dbService.getOneUser(id);
//   }

//   createUser(dto: CreateUserDto): User {
//     return this.dbService.createUser(dto);
//   }

//   deleteUser(id: string): void {
//     return this.dbService.deleteUser(id);
//   }

//   updateUserPassword(id: string, dto: UpdatePasswordDto): User {
//     return this.dbService.updateUserPassword(id, dto);
//   }
// }
