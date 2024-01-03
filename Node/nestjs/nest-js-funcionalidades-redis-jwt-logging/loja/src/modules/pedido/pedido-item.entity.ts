import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PedidoEntity } from './pedido.entity';
import { ProdutoEntity } from '../produto/produto.entity';

@Entity({ name: 'pedidos_itens' })
export class PedidoItemEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'quantidade', nullable: false })
	quantidade: number;

	@Column({ name: 'preco_venda', nullable: false })
	precoVenda: number;

	@ManyToOne(() => PedidoEntity, (pedido) => pedido.pedidosItens, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	pedido: PedidoEntity;

	@ManyToOne(() => ProdutoEntity, (produto) => produto.itensPedido, {
		cascade: ['update'],
	})
	produto: ProdutoEntity;
}
