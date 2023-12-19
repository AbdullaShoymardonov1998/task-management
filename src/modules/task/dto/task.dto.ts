import { ApiProperty } from '@nestjs/swagger';
import { StatusEnum } from '@prisma/client';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: 'Due date', example: new Date() })
  dueDate: Date;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({ description: 'Due date', example: new Date() })
  doneAt: Date;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Task created by', example: 'uuid' })
  createdById: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Project Id', example: 'uuid' })
  projectId: string;

  @IsEnum(StatusEnum)
  @ApiProperty({
    description: 'User role',
    enum: StatusEnum,
    example: StatusEnum.CREATED,
  })
  status: StatusEnum;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Worker Id', example: 'uuid' })
  workerId: string;
}

export class UpdateTaskDto extends CreateTaskDto {}
