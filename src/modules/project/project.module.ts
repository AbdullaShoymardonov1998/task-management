import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectRepository } from './project.repository';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { ProjectController } from './project.controller';
import { UserRepository } from '../user/user.repository';

@Module({
  providers: [ProjectService, ProjectRepository, PrismaService, UserRepository],
  controllers: [ProjectController],
  exports: [ProjectService],
})
export class ProjectModule {}
