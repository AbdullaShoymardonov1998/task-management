import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRoles } from '@prisma/client';
import { UserRepository } from '../user/user.repository';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from './dto/organization.dto';
import { OrganizationRepository } from './organization.repository';

@Injectable()
export class OrganizationService {
  constructor(
    private readonly repository: OrganizationRepository,
    private readonly user: UserRepository,
  ) {}

  async createGroup(body: CreateOrganizationDto) {
    const existingOrganization = await this.repository.getOrganizationByName(
      body.name,
    );
    if (existingOrganization) {
      throw new BadRequestException('Organization already exists');
    }

    const admin = await this.user.getAdminUser(body.createdById);
    if (admin !== UserRoles.ADMIN) {
      throw new UnauthorizedException('Permission denied');
    }
    const organization = await this.repository.createOrganization(body);

    return { organizationId: organization.id };
  }

  async getOrganizationById(id: string) {
    return this.repository.getOrganizationById(id);
  }

  async getOrganizations() {
    return await this.repository.getOrganizations();
  }

  async updateOrganization(id: string, body: UpdateOrganizationDto) {
    return await this.repository.updateOrganization(id, body);
  }

  async deleteOrganization(id: string) {
    return await this.repository.deleteOrganization(id);
  }
}
