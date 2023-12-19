import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import {
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from './dto/organization.dto';

@Injectable()
export class OrganizationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createOrganization(body: CreateOrganizationDto) {
    return await this.prisma.organization.create({
      data: {
        name: body.name,
        createdBy: {
          connect: {
            id: body.createdById,
          },
        },
      },
    });
  }
  async getOrganizationByName(name: string) {
    return this.prisma.organization.findUnique({
      where: { name },
      include: {
        organizationUserMap: true,
        projects: true,
      },
    });
  }

  async getOrganizationById(id: string) {
    return this.prisma.organization.findUnique({
      where: { id },
      include: {
        projects: true,
        organizationUserMap: true,
      },
    });
  }

  async getOrganizations() {
    return this.prisma.organization.findMany({
      include: {
        projects: true,
        organizationUserMap: true,
      },
    });
  }

  async updateOrganization(id: string, body: UpdateOrganizationDto) {
    const organization = await this.prisma.organization.update({
      where: { id },
      data: {
        name: body.name,
        createdBy: {
          connect: {
            id: body.createdById,
          },
        },
      },
    });
    return {
      organizationId: organization.id,
    };
  }

  async deleteOrganization(id: string) {
    const operations = [];
    operations.push(
      this.prisma.organizationUserMap.deleteMany({
        where: {
          organizationId: id,
        },
      }),
    );
    operations.push(
      this.prisma.project.deleteMany({
        where: {
          organizationId: id,
        },
      }),
    );
    operations.push(
      this.prisma.organization.delete({
        where: {
          id,
        },
      }),
    );

    return this.prisma.$transaction(operations);
  }
}
