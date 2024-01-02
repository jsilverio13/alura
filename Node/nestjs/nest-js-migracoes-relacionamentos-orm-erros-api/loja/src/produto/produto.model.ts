import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { ProdutoCaracteristicaModel } from './produto-caracteristica.model';
import { ProdutoImagemModel } from './produto-imagem.model';

@Entity({ name: 'produtos' })
export class ProdutoModel {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'usuario_id', length: 100, nullable: false })
	usuarioId: string;

	@Column({ name: 'nome', length: 100, nullable: false })
	nome: string;

	@Column({ name: 'valor', nullable: false })
	valor: number;

	@Column({ name: 'quantidade_disponivel', nullable: false })
	quantidadeDisponivel: number;

	@Column({ name: 'descricao', length: 255, nullable: false })
	descricao: string;

	@Column({ name: 'categoria', length: 100, nullable: false })
	categoria: string;

	@OneToMany(
		() => ProdutoCaracteristicaModel,
		(produtoCaracteristicaModel) => produtoCaracteristicaModel.produto,
		{ cascade: true, eager: true },
	)
	caracteristicas: ProdutoCaracteristicaModel[];

	@OneToMany(
		() => ProdutoImagemModel,
		(produtoImagemModel) => produtoImagemModel.produto,
		{ cascade: true, eager: true },
	)
	imagens: ProdutoImagemModel[];

	@CreateDateColumn({ name: 'created_at' })
	createdAt: string;

	@CreateDateColumn({ name: 'updated_at' })
	updatedAt: string;

	@CreateDateColumn({ name: 'deleted_at' })
	deletedAt: string;
}
