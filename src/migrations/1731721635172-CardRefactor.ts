import { MigrationInterface, QueryRunner } from "typeorm";

export class CardRefactor1731721635172 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "card" RENAME COLUMN "name" TO "title"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "card" RENAME COLUMN "title" TO "name"`
    );
  }
}
