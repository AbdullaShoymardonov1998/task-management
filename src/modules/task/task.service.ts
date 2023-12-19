import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TaskRepository } from './task.repository';
import { UserRepository } from '../user/user.repository';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { UserRoles } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(
    private readonly repository: TaskRepository,
    private readonly user: UserRepository,
  ) {}

  async createTask(body: CreateTaskDto) {
    const admin = await this.user.getAdminUser(body.createdById);
    if (admin !== UserRoles.DIRECTOR) {
      throw new UnauthorizedException('Permission denied');
    }

    const task = await this.repository.createTask(body);

    return {
      taskId: task.id,
    };
  }

  async getTaskById(id: string) {
    const project = await this.repository.getTaskById(id);

    if (!project) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return project;
  }

  async getTaskByWorkerId(workerId: string) {
    const task = await this.repository.getTaskByWorkerId(workerId);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }

    return task;
  }

  async getTasks() {
    return await this.repository.getTasks();
  }

  async updateTaskById(id: string, body: UpdateTaskDto) {
    await this.getTaskById(id);

    const updatedTask = await this.repository.updateTaskById(id, body);

    return {
      updatedProjectId: updatedTask.id,
    };
  }

  async deleteTask(id: string) {
    await this.getTaskById(id);
    await this.repository.deleteTaskById(id);

    return { message: 'Task deleted successfully' };
  }
}
