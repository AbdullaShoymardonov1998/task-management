import { Injectable } from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class ProjectRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProject(body: CreateProjectDto) {
    return this.prisma.project.create({
      data: {
        name: body.name,
        createdBy: {
          connect: {
            id: body.createdById,
          },
        },
        organization: {
          connect: {
            id: body.organizationId,
          },
        },
      },
    });
  }

  async getProjectByname(name: string) {
    return this.prisma.project.findUnique({
      where: { name },
    });
  }

  async getProjectById(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
      include: {
        tasks: true,
      },
    });
  }

  async getProjects() {
    return this.prisma.project.findMany({
      include: {
        tasks: true,
      },
    });
  }

  async updateProjectById(id: string, body: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id },
      data: {
        name: body.name,
        createdBy: {
          connect: {
            id: body.createdById,
          },
        },
        organization: {
          connect: {
            id: body.organizationId,
          },
        },
      },
    });
  }

  async deleteProjectById(id: string) {
    return this.prisma.$transaction([
      this.prisma.task.deleteMany({
        where: { projectId: id },
      }),
      this.prisma.project.delete({
        where: { id },
      }),
    ]);
  }
}
