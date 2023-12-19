import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createTask(body: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        dueDate: body.dueDate,
        doneAt: body.doneAt,
        status: body.status,
        worker: {
          connect: {
            id: body.workerId,
          },
        },
        createdBy: {
          connect: {
            id: body.createdById,
          },
        },
        project: {
          connect: {
            id: body.projectId,
          },
        },
      },
    });
  }

  async getTasks() {
    return this.prisma.task.findMany({
      include: {
        project: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async getTaskById(id: string) {
    return this.prisma.task.findUnique({
      where: { id },
      include: {
        project: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async getTaskByWorkerId(workerId: string) {
    return this.prisma.task.findMany({
      where: {
        workerId,
      },
      include: {
        project: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async updateTaskById(id: string, body: UpdateTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: {
        dueDate: body.dueDate,
        doneAt: body.doneAt,
        status: body.status,
        worker: {
          connect: {
            id: body.workerId,
          },
        },
        createdBy: {
          connect: {
            id: body.createdById,
          },
        },
        project: {
          connect: {
            id: body.projectId,
          },
        },
      },
    });
  }

  async deleteTaskById(id: string) {
    return this.prisma.project.delete({
      where: { id },
    });
  }
}
