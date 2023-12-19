import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UserRepository } from '../user/user.repository';

@Module({
  providers: [TaskService, TaskRepository, PrismaService, UserRepository],
  controllers: [TaskController],
})
export class TaskModule {}
