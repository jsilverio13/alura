import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PedidoEntity } from './pedido.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { PedidoStatus } from './enum/pedido-status.enum';
import { PedidoItemEntity } from './pedido-item.entity';
import { CriaPedidoDTO } from './dto/cria-pedido.dto';
import { AtualizaPedidoDTO } from './dto/atualiza-pedido.dto';
import { ProdutoEntity } from '../produto/produto.entity';

@Injectable()
export class PedidoService {
	constructor(
		@InjectRepository(PedidoEntity)
		private readonly pedidoRepository: Repository<PedidoEntity>,
		@InjectRepository(UsuarioEntity)
		private readonly usuarioRepository: Repository<UsuarioEntity>,
		@InjectRepository(ProdutoEntity)
		private readonly produtoRepository: Repository<ProdutoEntity>,
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

		const pedidoEntity = new PedidoEntity();

		pedidoEntity.status = PedidoStatus.EM_PROCESSAMENTO;
		pedidoEntity.usuario = usuario;

		const itensPedidoEntity = dadosDoPedido.itensPedido.map((itemPedido) => {
			const produtoRelacionado = produtosRelacionados.find(
				(produto) => produto.id === itemPedido.produtoId,
			);

			const itemPedidoEntity = new PedidoItemEntity();
			itemPedidoEntity.produto = produtoRelacionado!;
			itemPedidoEntity.precoVenda = produtoRelacionado!.valor;
			itemPedidoEntity.quantidade = itemPedido.quantidade;
			itemPedidoEntity.produto.quantidadeDisponivel -= itemPedido.quantidade;
			return itemPedidoEntity;
		});

		const valorTotal = itensPedidoEntity.reduce((total, item) => {
			return total + item.precoVenda * item.quantidade;
		}, 0);

		pedidoEntity.pedidosItens = itensPedidoEntity;
		pedidoEntity.valorTotal = valorTotal;

		const pedidoCriado = await this.pedidoRepository.save(pedidoEntity);

		return pedidoCriado;
	}

	async trataDadosPedido(
		dadosDoPedido: CriaPedidoDTO,
		produtosRelacionados: ProdutoEntity[],
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

	async atualizaPedido(id: string, dto: AtualizaPedidoDTO) {
		const pedido = await this.buscaPedido(id);

		Object.assign(pedido, dto as PedidoEntity);

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
