import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoModel } from './produto.model';

@Entity({ name: 'produto_caracteristicas' })
export class ProdutoCaracteristicaModel {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'nome', length: 100, nullable: false })
	nome: string;

	@Column({ name: 'descricao', length: 255, nullable: false })
	descricao: string;

	@ManyToOne(() => ProdutoModel, (produto) => produto.caracteristicas, {
		orphanedRowAction: 'delete',
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	produto: ProdutoModel;
}
