import { PedidoModel } from '../pedido/pedido.model';
import {
	Entity,
	Column,
	CreateDateColumn,
	PrimaryGeneratedColumn,
	OneToMany,
} from 'typeorm';

@Entity({ name: 'usuarios' })
export class UsuarioModel {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ name: 'nome', length: 100, nullable: false })
	nome: string;

	@Column({ name: 'email', length: 70, nullable: false })
	email: string;

	@Column({ name: 'senha', length: 255, nullable: false })
	senha: string;

	@Column({
		name: 'endereco',
		length: 255,
		nullable: false,
		default: 'sem_endereco',
	})
	endereco: string;

	@CreateDateColumn({ name: 'created_at' })
	createdAt: string;

	@CreateDateColumn({ name: 'updated_at' })
	updatedAt: string;

	@CreateDateColumn({ name: 'deleted_at' })
	deletedAt: string;

	@OneToMany(() => PedidoModel, (pedido) => pedido.usuario)
	pedidos: PedidoModel[];
}
