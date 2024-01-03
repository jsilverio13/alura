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
import { UsuarioEntity } from '../usuario/usuario.entity';
import { PedidoItemEntity } from './pedido-item.entity';

@Entity({ name: 'pedidos' })
export class PedidoEntity {
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

	@ManyToOne(() => UsuarioEntity, (usuario) => usuario.pedidos)
	usuario: UsuarioEntity;

	@OneToMany(() => PedidoItemEntity, (pedidoItem) => pedidoItem.pedido, {
		cascade: true,
		eager: true,
	})
	pedidosItens: PedidoItemEntity[];
}
