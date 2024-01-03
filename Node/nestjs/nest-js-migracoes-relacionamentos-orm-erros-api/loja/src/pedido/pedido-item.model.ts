import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { PedidoModel } from './pedido.model';
import { ProdutoModel } from '../produto/produto.model';

@Entity({ name: 'pedidos_itens' })
export class PedidoItemModel {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'quantidade', nullable: false })
	quantidade: number;

	@Column({ name: 'preco_venda', nullable: false })
	precoVenda: number;

	@ManyToOne(() => PedidoModel, (pedido) => pedido.pedidosItens, {
		onDelete: 'CASCADE',
		onUpdate: 'CASCADE',
	})
	pedido: PedidoModel;

	@ManyToOne(() => ProdutoModel, (produto) => produto.itensPedido, {
		cascade: ['update'],
	})
	produto: ProdutoModel;
}
