import { MigrationInterface, QueryRunner } from "typeorm";

export class RelacionaItemPedidoEProduto1704241226697 implements MigrationInterface {
    name = 'RelacionaItemPedidoEProduto1704241226697'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pedidos_itens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantidade" integer NOT NULL, "preco_venda" integer NOT NULL, "pedidoId" uuid, "produtoId" uuid, CONSTRAINT "PK_64a3184c16f596af092d76bc371" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "pedidos_itens" ADD CONSTRAINT "FK_6fb9cedd77a67c539ce5a4fa522" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pedidos_itens" ADD CONSTRAINT "FK_ea1ffbb603769a976cec490a0f2" FOREIGN KEY ("produtoId") REFERENCES "produtos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pedidos_itens" DROP CONSTRAINT "FK_ea1ffbb603769a976cec490a0f2"`);
        await queryRunner.query(`ALTER TABLE "pedidos_itens" DROP CONSTRAINT "FK_6fb9cedd77a67c539ce5a4fa522"`);
        await queryRunner.query(`DROP TABLE "pedidos_itens"`);
    }

}