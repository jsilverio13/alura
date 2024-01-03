import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PedidoModel } from './pedido.model';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioModel } from '../usuario/usuario.model';
import { PedidoStatus } from './enum/pedido-status.enum';
import { PedidoItemModel } from './pedido-item.model';
import { CriaPedidoDTO } from './dto/cria-pedido.dto';
import { AtualizaPedidoDto } from './dto/atualiza-pedido.dto';
import { ProdutoModel } from '../produto/produto.model';

@Injectable()
export class PedidoService {
	constructor(
		@InjectRepository(PedidoModel)
		private readonly pedidoRepository: Repository<PedidoModel>,
		@InjectRepository(UsuarioModel)
		private readonly usuarioRepository: Repository<UsuarioModel>,
		@InjectRepository(ProdutoModel)
		private readonly produtoRepository: Repository<ProdutoModel>,
	) {}

	async cadatraPedido(usuarioId: string, dadosDoPedido: CriaPedidoDTO) {
		const produtosId = dadosDoPedido.itensPedido.map(
			(itemPedido) => itemPedido.produtoId,
		);

		const produtosRelacionados = await this.produtoRepository.findBy({
			id: In(produtosId),
		});

		await this.trataDadosPedido(dadosDoPedido, produtosRelacionados);
		const usuario = await this.buscaUsuario(usuarioId);

		const pedidoModel = new PedidoModel();

		pedidoModel.status = PedidoStatus.EM_PROCESSAMENTO;
		pedidoModel.usuario = usuario;

		const itensPedidoModel = dadosDoPedido.itensPedido.map((itemPedido) => {
			const produtoRelacionado = produtosRelacionados.find(
				(produto) => produto.id === itemPedido.produtoId,
			);

			const itemPedidoModel = new PedidoItemModel();
			itemPedidoModel.produto = produtoRelacionado!;
			itemPedidoModel.precoVenda = produtoRelacionado!.valor;
			itemPedidoModel.quantidade = itemPedido.quantidade;
			itemPedidoModel.produto.quantidadeDisponivel -= itemPedido.quantidade;
			return itemPedidoModel;
		});

		const valorTotal = itensPedidoModel.reduce((total, item) => {
			return total + item.precoVenda * item.quantidade;
		}, 0);

		pedidoModel.pedidosItens = itensPedidoModel;
		pedidoModel.valorTotal = valorTotal;

		const pedidoCriado = await this.pedidoRepository.save(pedidoModel);

		return pedidoCriado;
	}

	async trataDadosPedido(
		dadosDoPedido: CriaPedidoDTO,
		produtosRelacionados: ProdutoModel[],
	) {
		dadosDoPedido.itensPedido.forEach((itemPedido) => {
			const produtoRelacionado = produtosRelacionados.find(
				(produto) => produto.id === itemPedido.produtoId,
			);

			if (produtoRelacionado === undefined) {
				throw new NotFoundException('O produto não foi encontrado');
			}

			if (itemPedido.quantidade > produtoRelacionado.quantidadeDisponivel) {
				throw new BadRequestException(
					`A quantidade solicitda ${itemPedido.quantidade} é maior do que a disponivel ${produtoRelacionado.quantidadeDisponivel}`,
				);
			}
		});
	}

	async obtemPedidosDeUsuario(usuarioId: string) {
		return this.pedidoRepository.find({
			where: {
				usuario: { id: usuarioId },
			},
			relations: {
				usuario: true,
			},
		});
	}

	async atualizaPedido(id: string, dto: AtualizaPedidoDto) {
		const pedido = await this.buscaPedido(id);

		Object.assign(pedido, dto);

		return this.pedidoRepository.save(pedido);
	}

	private async buscaPedido(id: string) {
		const pedido = await this.pedidoRepository.findOneBy({ id });

		if (pedido === null) {
			throw new NotFoundException('O Pedido não foi encontrado');
		}
		return pedido;
	}

	private async buscaUsuario(usuarioId: string) {
		const usuario = await this.usuarioRepository.findOneBy({ id: usuarioId });

		if (usuario === null) {
			throw new NotFoundException('O usuário não foi encontrado');
		}
		return usuario;
	}
}
