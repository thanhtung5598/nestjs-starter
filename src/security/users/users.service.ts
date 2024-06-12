import { Injectable } from '@nestjs/common';
import { Role } from './roles/role.enum';

export type User = {
  userId: number;
  username: string;
  password: string;
  roles: Role[];
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userId: 1,
      username: 'john',
      password: '123123123',
      roles: [Role.Admin],
    },
    {
      userId: 2,
      username: 'maria',
      password: '456456456',
      roles: [Role.User],
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
