export class CreateUserDto {
  login: string;
  password: string;
}

export class UpdateUserDto {
  oldPassword: string;
  newPassword: string;
}
