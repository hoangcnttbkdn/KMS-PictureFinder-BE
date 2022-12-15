import { MigrationInterface, QueryRunner } from 'typeorm'

export class addBibAndClothesRecognize1671082560902
  implements MigrationInterface
{
  name = 'addBibAndClothesRecognize1671082560902'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD "bib" character varying`,
    )
    await queryRunner.query(
      `CREATE TYPE "public"."sessions_type_recognize_enum" AS ENUM('FACE', 'BIB', 'CLOTHES')`,
    )
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD "type_recognize" "public"."sessions_type_recognize_enum" NOT NULL DEFAULT 'FACE'`,
    )
    await queryRunner.query(
      `ALTER TABLE "sessions" ALTER COLUMN "target_image_url" DROP NOT NULL`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" ALTER COLUMN "target_image_url" SET NOT NULL`,
    )
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP COLUMN "type_recognize"`,
    )
    await queryRunner.query(`DROP TYPE "public"."sessions_type_recognize_enum"`)
    await queryRunner.query(`ALTER TABLE "sessions" DROP COLUMN "bib"`)
  }
}
