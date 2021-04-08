import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatedActivateToken1617840560576 implements MigrationInterface {
    name = 'CreatedActivateToken1617840560576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "activate_tokens" ("id" character varying NOT NULL, "token" character varying NOT NULL, "user_id" character varying NOT NULL, CONSTRAINT "REL_8a0e910a19c2e855b2fd78cfb2" UNIQUE ("user_id"), CONSTRAINT "PK_8dd26d5c5297c3ca1e8e01ac0a6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "activate_tokens" ADD CONSTRAINT "FK_8a0e910a19c2e855b2fd78cfb2d" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "activate_tokens" DROP CONSTRAINT "FK_8a0e910a19c2e855b2fd78cfb2d"`);
        await queryRunner.query(`DROP TABLE "activate_tokens"`);
    }

}
