-- DropIndex
DROP INDEX "Post_writer_key";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "writer" SET DEFAULT E'bbangjo';
