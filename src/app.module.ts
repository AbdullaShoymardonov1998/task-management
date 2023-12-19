import { Module } from '@nestjs/common';
import { OrganizationModule } from './modules/organization/organization.module';
import { ProjectModule } from './modules/project/project.module';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, OrganizationModule, TaskModule, ProjectModule],
})
export class AppModule {}
