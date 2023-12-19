import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '@prisma/client';

export class UserResponseDto {
  @ApiProperty({ description: 'User Id' })
  id: string;

  @ApiProperty({ description: 'User name', example: 'John' })
  name: string;

  @ApiProperty({ description: 'User role', enum: UserRoles })
  role: UserRoles;

  @ApiProperty({ description: 'Created by User', example: 'admin' })
  createdById: string;

  @ApiProperty({ description: 'User name', example: 'John' })
  organizationUserMap: string[];
}
