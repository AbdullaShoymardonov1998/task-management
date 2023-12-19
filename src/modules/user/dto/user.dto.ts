import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Username', example: 'John Doe' })
  name: string;

  @IsEnum(UserRoles)
  @ApiProperty({
    description: 'User role',
    enum: UserRoles,
    example: UserRoles.EMPLOYEE,
  })
  role: UserRoles;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User Id', example: 'uuid' })
  createdById: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Organization Id', example: 'uuid' })
  organizationId: string;
}

export class UpdateUserDto extends CreateUserDto {}
