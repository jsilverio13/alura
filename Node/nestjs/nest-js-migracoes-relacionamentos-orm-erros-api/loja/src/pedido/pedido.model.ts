import {
	Entity,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	ManyToOne,
	OneToMany,
} from 'typeorm';
import { PedidoStatus } from './enum/pedido-status.enum';
import { UsuarioModel } from '../usuario/usuario.model';
import { PedidoItemModel } from './pedido-item.model';

@Entity({ name: 'pedidos' })
export class PedidoModel {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'valor_total', nullable: false })
	valorTotal: number;

	@Column({ name: 'status', enum: PedidoStatus, nullable: false })
	status: PedidoStatus;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: string;

	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: string;

	@DeleteDateColumn({ name: 'deleted_at' })
	deletedAt: string;

	@ManyToOne(() => UsuarioModel, (usuario) => usuario.pedidos)
	usuario: UsuarioModel;

	@OneToMany(() => PedidoItemModel, (pedidoItem) => pedidoItem.pedido, {
		cascade: true,
		eager: true,
	})
	pedidosItens: PedidoItemModel[];
}
