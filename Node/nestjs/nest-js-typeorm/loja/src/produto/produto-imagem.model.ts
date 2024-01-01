import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProdutoModel } from './produto.model';

@Entity({ name: 'produto_imagens' })
export class ProdutoImagemModel {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'nome', length: 100, nullable: false })
	url: string;

	@Column({ name: 'descricao', length: 255, nullable: false })
	descricao: string;

	@ManyToOne(() => ProdutoModel, (produto) => produto.imagens, {
		orphanedRowAction: 'delete',
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	produto: any;
}
