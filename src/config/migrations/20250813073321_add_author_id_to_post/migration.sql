/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `posts` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."comments" DROP CONSTRAINT "comments_postId_fkey";

-- AlterTable
ALTER TABLE "public"."posts" DROP COLUMN "updatedAt",
ADD COLUMN     "authorId" INTEGER;

-- AddForeignKey
ALTER TABLE "public"."posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."author"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."comments" ADD CONSTRAINT "comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
