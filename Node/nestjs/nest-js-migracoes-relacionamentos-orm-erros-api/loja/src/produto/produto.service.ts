import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoModel } from './produto.model';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';
import { CriaProdutoDTO } from './dto/criaProduto.dto';

@Injectable()
export class ProdutoService {
	constructor(
		@InjectRepository(ProdutoModel)
		private readonly produtoRepository: Repository<ProdutoModel>,
	) {}

	async criaProduto(dadosProduto: CriaProdutoDTO) {
		const produto = new ProdutoModel();

		produto.nome = dadosProduto.nome;
		produto.usuarioId = dadosProduto.usuarioId;
		produto.valor = dadosProduto.valor;
		produto.quantidadeDisponivel = dadosProduto.quantidadeDisponivel;
		produto.descricao = dadosProduto.descricao;
		produto.categoria = dadosProduto.categoria;
		produto.caracteristicas = dadosProduto.caracteristicas;
		produto.imagens = dadosProduto.imagens;
		await this.produtoRepository.save(produto);

		return produto;
	}

	async listaProdutos() {
		return await this.produtoRepository.find();
	}
	async removeProduto(id: string) {
		const produto = await this.buscarPorId(id);

		await this.produtoRepository.remove(produto);
	}

	async atualizaProduto(id: string, dadosProduto: AtualizaProdutoDTO) {
		const produto = await this.buscarPorId(id);

		const dadosNaoAtualizaveis = ['id', 'usuarioId'];
		Object.entries(dadosProduto).forEach(([chave, valor]) => {
			if (dadosNaoAtualizaveis.includes(chave)) {
				return;
			}
			produto[chave] = valor;
		});

		await this.produtoRepository.update(id, produto);
	}

	private async buscarPorId(id: string) {
		const possivelProduto = await this.produtoRepository.findOneBy({ id: id });

		if (!possivelProduto) {
			throw new NotFoundException('Produto não existe');
		}

		return possivelProduto;
	}
}
