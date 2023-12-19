import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ProjectRepository } from './project.repository';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { UserRepository } from '../user/user.repository';
import { UserRoles } from '@prisma/client';

@Injectable()
export class ProjectService {
  constructor(
    private readonly repository: ProjectRepository,
    private readonly user: UserRepository,
  ) {}

  async createProject(body: CreateProjectDto) {
    const existingProject = await this.repository.getProjectByname(body.name);
    if (existingProject) {
      throw new BadRequestException('Project already exists');
    }

    const admin = await this.user.getAdminUser(body.createdById);
    if (admin !== UserRoles.DIRECTOR) {
      throw new UnauthorizedException('Permission denied');
    }

    const project = await this.repository.createProject(body);

    return {
      projectId: project.id,
    };
  }

  async getProjectById(id: string) {
    const project = await this.repository.getProjectById(id);

    if (!project) {
      throw new HttpException('Project not found', HttpStatus.NOT_FOUND);
    }

    return project;
  }

  async getProjects() {
    const projects = await this.repository.getProjects();
    return { projects };
  }

  async updateProjectById(id: string, body: UpdateProjectDto) {
    await this.getProjectById(id);

    const updatedProjects = await this.repository.updateProjectById(id, body);

    return {
      updatedProjectId: updatedProjects.id,
    };
  }

  async deleteProject(id: string) {
    await this.getProjectById(id);
    await this.repository.deleteProjectById(id);

    return { message: 'Project deleted successfully' };
  }
}
