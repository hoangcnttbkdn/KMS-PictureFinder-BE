import { MigrationInterface, QueryRunner } from 'typeorm'

export class init1669796147628 implements MigrationInterface {
  name = 'init1669796147628'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."sessions_type_enum" AS ENUM('DRIVE', 'FACEBOOK')`,
    )
    await queryRunner.query(
      `CREATE TABLE "sessions" ("id" SERIAL NOT NULL, "url" text NOT NULL, "total_images" integer NOT NULL, "type" "public"."sessions_type_enum" NOT NULL, "is_finished" boolean NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `CREATE TABLE "images" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "url" character varying NOT NULL, "is_matched" boolean NOT NULL, "recognized_at" TIMESTAMP, "extra_data" text, "error_logs" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "request_info_id" integer, CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id"))`,
    )
    await queryRunner.query(
      `ALTER TABLE "images" ADD CONSTRAINT "fk_d984f9b314c2374105b9f1e94d851d05" FOREIGN KEY ("request_info_id") REFERENCES "sessions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "images" DROP CONSTRAINT "fk_d984f9b314c2374105b9f1e94d851d05"`,
    )
    await queryRunner.query(`DROP TABLE "images"`)
    await queryRunner.query(`DROP TABLE "sessions"`)
    await queryRunner.query(`DROP TYPE "public"."sessions_type_enum"`)
  }
}
