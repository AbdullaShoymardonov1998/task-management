import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
@ApiTags('Tasks')
@Controller({ path: 'tasks', version: '1' })
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Post()
  @ApiOperation({ summary: 'Create task' })
  createProject(@Body() body: CreateTaskDto) {
    return this.service.createTask(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get project' })
  getProjectById(@Param('id') id: string) {
    return this.service.getTaskById(id);
  }

  @Get('/worker/:id')
  @ApiOperation({ summary: 'Get tasks by worker id' })
  getProjectByWorkerId(@Param('id') id: string) {
    return this.service.getTaskByWorkerId(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get tasks' })
  getTasks() {
    return this.service.getTasks();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update task' })
  updateTask(@Body() body: UpdateTaskDto, @Param('id') id: string) {
    return this.service.updateTaskById(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task' })
  deleteTask(@Param('id') id: string) {
    return this.service.deleteTask(id);
  }
}
