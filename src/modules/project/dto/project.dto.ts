import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Project name', example: 'Project 1' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User Id', example: 'uuid' })
  createdById: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Organization Id', example: 'uuid' })
  organizationId: string;
}

export class UpdateProjectDto extends CreateProjectDto {}
