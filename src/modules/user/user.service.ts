import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserRoles } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly prisma: PrismaService,
  ) {}

  async createUser(body: CreateUserDto) {
    const existingUser = await this.getUserByName(body.name);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const admin = await this.repository.getAdminUser(body.createdById);
    if (admin !== UserRoles.ADMIN) {
      throw new UnauthorizedException('Permission denied');
    }
    const user = await this.repository.createUser(body);

    return {
      userId: user.id,
    };
  }

  async getUserById(id: string) {
    const user = await this.repository.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUserByName(username: string) {
    return this.repository.getUserByName(username);
  }

  async getDirectors() {
    const directors = await this.repository.getUsersByRole(UserRoles.DIRECTOR);
    return { directors };
  }

  async getEmployees() {
    const employees = await this.repository.getUsersByRole(UserRoles.EMPLOYEE);
    return { employees };
  }

  async updateUser(id: string, body: UpdateUserDto) {
    await this.getUserById(id);
    return this.repository.updateUser(id, body);
  }

  async deleteUser(id: string) {
    await this.getUserById(id);
    await this.repository.deleteUser(id);
    return { message: 'User deleted successfully' };
  }
}
