import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserRoles } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(body: CreateUserDto) {
    return await this.prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          name: body.name,
          role: body.role,
          createdById: body.createdById,
        },
      });

      await prisma.organizationUserMap.create({
        data: {
          createdBy: {
            connect: { id: user.id },
          },
          organization: {
            connect: { id: body.organizationId },
          },
        },
      });

      return user;
    });
  }

  async getAdminUser(adminId: string) {
    const admin = await this.prisma.user?.findUnique({
      where: {
        id: adminId,
      },
    });
    return admin.role;
  }
  async getUserByName(name: string) {
    return this.prisma.user.findUnique({
      where: { name },
      include: {
        createdByUser: true,
        createdUsers: true,
        organizationUserMap: true,
        projects: true,
        createdTasks: true,
        assignedTasks: true,
      },
    });
  }
  async getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        createdByUser: true,
        createdUsers: true,
        organizationUserMap: true,
        projects: true,
        createdTasks: true,
        assignedTasks: true,
      },
    });
  }

  async getUsersByRole(role: UserRoles) {
    return this.prisma.user.findMany({
      where: { role },
      include: {
        createdByUser: true,
        createdUsers: true,
        organizationUserMap: true,
        projects: true,
        createdTasks: true,
        assignedTasks: true,
      },
    });
  }

  async updateUser(id: string, body: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: {
        name: body.name,
        role: body.role,
        createdById: body.createdById,
      },
    });
  }

  async deleteUser(userId: string) {
    return this.prisma.$transaction([
      this.prisma.organization.updateMany({
        where: { createdById: userId },
        data: { createdById: null },
      }),

      this.prisma.organizationUserMap.updateMany({
        where: { createdById: userId },
        data: { createdById: null },
      }),

      this.prisma.project.updateMany({
        where: { createdById: userId },
        data: { createdById: null },
      }),

      this.prisma.task.updateMany({
        where: { createdById: userId },
        data: { createdById: null },
      }),

      // Finally, delete the user
      this.prisma.user.delete({
        where: { id: userId },
      }),
    ]);
  }
}
