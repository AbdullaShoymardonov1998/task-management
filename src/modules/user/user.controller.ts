import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@ApiTags('User')
@Controller({ path: 'users', version: '1' })
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  createUser(@Body() body: CreateUserDto) {
    return this.service.createUser(body);
  }

  @Get('directors')
  @ApiOperation({ summary: 'Get directors' })
  getUsers() {
    return this.service.getDirectors();
  }

  @Get('employees')
  @ApiOperation({ summary: 'Get employees' })
  getStudents() {
    return this.service.getEmployees();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user' })
  getUser(@Param('id') id: string) {
    return this.service.getUserById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.service.updateUser(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  deleteUser(@Param('id') id: string) {
    return this.service.deleteUser(id);
  }
}
