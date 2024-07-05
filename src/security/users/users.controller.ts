import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from './roles/roles.decorator';
import { Role } from './roles/role.enum';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersServices: UsersService) {}

  @Get()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  getAllUsers() {
    return this.usersServices.getAllUser();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse()
  getMe(@Param('id') id: string) {
    return this.usersServices.getUserById(id);
  }
}
