import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { ProdutoCaracteristicaEntity } from './produto-caracteristica.entity';
import { ProdutoImagemEntity } from './produto-imagem.entity';
import { PedidoItemEntity } from '../pedido/pedido-item.entity';

@Entity({ name: 'produtos' })
export class ProdutoEntity {
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
		() => ProdutoCaracteristicaEntity,
		(produtoCaracteristicaEntity) => produtoCaracteristicaEntity.produto,
		{ cascade: true, eager: true },
	)
	caracteristicas: ProdutoCaracteristicaEntity[];

	@OneToMany(
		() => ProdutoImagemEntity,
		(produtoImagemEntity) => produtoImagemEntity.produto,
		{ cascade: true, eager: true },
	)
	imagens: ProdutoImagemEntity[];

	@CreateDateColumn({ name: 'created_at' })
	createdAt: string;

	@CreateDateColumn({ name: 'updated_at' })
	updatedAt: string;

	@CreateDateColumn({ name: 'deleted_at' })
	deletedAt: string;

	@OneToMany(() => PedidoItemEntity, (itemPedido) => itemPedido.produto, {})
	itensPedido: PedidoItemEntity[];
}
