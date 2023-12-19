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
import { ProjectService } from './project.service';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';

@ApiTags('Projects')
@Controller({ path: 'projects', version: '1' })
export class ProjectController {
  constructor(private readonly service: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Create project' })
  createProject(@Body() body: CreateProjectDto) {
    return this.service.createProject(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project' })
  getProjectById(@Param('id') id: string) {
    return this.service.getProjectById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get projects' })
  getProjects() {
    return this.service.getProjects();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update project' })
  updateProject(@Body() body: UpdateProjectDto, @Param('id') id: string) {
    return this.service.updateProjectById(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project' })
  deleteProject(@Param('id') id: string) {
    return this.service.deleteProject(id);
  }
}
