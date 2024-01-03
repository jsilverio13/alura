import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PedidoModel } from './pedido.model';
import { UsuarioModel } from '../usuario/usuario.model';
import { ProdutoModel } from '../produto/produto.model';

@Module({
	imports: [
		TypeOrmModule.forFeature([PedidoModel, UsuarioModel, ProdutoModel]),
	],
	controllers: [PedidoController],
	providers: [PedidoService],
})
export class PedidoModule {}
