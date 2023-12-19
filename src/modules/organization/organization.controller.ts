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
import { OrganizationService } from './organization.service';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from './dto/organization.dto';

@ApiTags('Group')
@Controller({ path: 'organizations', version: '1' })
export class OrganizationController {
  constructor(private readonly service: OrganizationService) {}

  @Post()
  @ApiOperation({ summary: 'Create organization' })
  createGroup(@Body() body: CreateOrganizationDto) {
    return this.service.createGroup(body);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get organization' })
  getGroup(@Param('id') id: string) {
    return this.service.getOrganizationById(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get organizations' })
  getGroups() {
    return this.service.getOrganizations();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update group' })
  updateGroup(@Param('id') id: string, @Body() body: UpdateOrganizationDto) {
    return this.service.updateOrganization(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete group' })
  deleteGroup(@Param('id') id: string) {
    return this.service.deleteOrganization(id);
  }
}
