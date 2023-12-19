import { Module } from '@nestjs/common';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { OrganizationRepository } from './organization.repository';
import { UserRepository } from '../user/user.repository';

@Module({
  controllers: [OrganizationController],
  providers: [
    OrganizationService,
    OrganizationRepository,
    PrismaService,
    UserRepository,
  ],
  exports: [OrganizationService],
})
export class OrganizationModule {}
