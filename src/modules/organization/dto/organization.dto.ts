import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Organization name', example: 'Bunker' })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'User Id', example: 'uuid' })
  createdById: string;
}

export class UpdateOrganizationDto extends CreateOrganizationDto {}
