/*
  Warnings:

  - You are about to drop the column `group_id` on the `organization_user_map` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `organization_user_map` table. All the data in the column will be lost.
  - You are about to drop the column `group_id` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `projectId` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `tasks` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[created_by_id,organization_id]` on the table `organization_user_map` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,organization_id]` on the table `projects` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `created_by_id` to the `organization_user_map` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `organization_user_map` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organization_id` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `created_by_id` to the `tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "organization_user_map" DROP CONSTRAINT "organization_user_map_group_id_fkey";

-- DropForeignKey
ALTER TABLE "organization_user_map" DROP CONSTRAINT "organization_user_map_user_id_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_group_id_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_user_id_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_projectId_fkey";

-- DropForeignKey
ALTER TABLE "tasks" DROP CONSTRAINT "tasks_user_id_fkey";

-- DropIndex
DROP INDEX "organization_user_map_user_id_group_id_key";

-- DropIndex
DROP INDEX "projects_user_id_group_id_key";

-- AlterTable
ALTER TABLE "organization_user_map" DROP COLUMN "group_id",
DROP COLUMN "user_id",
ADD COLUMN     "created_by_id" TEXT NOT NULL,
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "group_id",
DROP COLUMN "user_id",
ADD COLUMN     "created_by_id" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "organization_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "projectId",
DROP COLUMN "updated_at",
DROP COLUMN "user_id",
ADD COLUMN     "created_by_id" TEXT NOT NULL,
ADD COLUMN     "project_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "organization_user_map_created_by_id_organization_id_key" ON "organization_user_map"("created_by_id", "organization_id");

-- CreateIndex
CREATE UNIQUE INDEX "projects_name_key" ON "projects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "projects_name_organization_id_key" ON "projects"("name", "organization_id");

-- AddForeignKey
ALTER TABLE "organization_user_map" ADD CONSTRAINT "organization_user_map_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organization_user_map" ADD CONSTRAINT "organization_user_map_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "organizations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
