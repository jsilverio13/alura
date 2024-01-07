import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Patch,
	UseGuards,
	Req,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { CriaPedidoDTO } from './dto/cria-pedido.dto';
import { AtualizaPedidoDTO } from './dto/atualiza-pedido.dto';
import {
	AutenticacaoGuard,
	RequisicaoComUsuario,
} from '../autenticacao/autenticacao.guard';

@Controller('pedidos')
@UseGuards(AutenticacaoGuard)
export class PedidoController {
	constructor(private readonly pedidoService: PedidoService) {}

	@Post()
	async criaPedido(
		@Req() req: RequisicaoComUsuario,
		@Body() dadosDoPedido: CriaPedidoDTO,
	) {
		const usuarioId = req.usuario.sub;
		const pedidoCriado = await this.pedidoService.cadatraPedido(
			usuarioId,
			dadosDoPedido,
		);

		return pedidoCriado;
	}

	@Get()
	async obtemPedidosDeUsuario(@Req() req: RequisicaoComUsuario) {
		const usuarioId = req.usuario.sub;
		const pedidos = await this.pedidoService.obtemPedidosDeUsuario(usuarioId);

		return pedidos;
	}

	@Patch(':id')
	atualizaPedido(
		@Param('id') pedidoId: string,
		@Body() dadosDeAtualizacao: AtualizaPedidoDTO,
	) {
		return this.pedidoService.atualizaPedido(pedidoId, dadosDeAtualizacao);
	}
}
