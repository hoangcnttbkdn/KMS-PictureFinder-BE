import { MigrationInterface, QueryRunner } from 'typeorm'

export class addDriveToken1670936621615 implements MigrationInterface {
  name = 'addDriveToken1670936621615'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "token" ("id" SERIAL NOT NULL, "type" text NOT NULL, "client_id" text NOT NULL, "client_secret" text NOT NULL, "refresh_token" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "token"`)
  }
}
