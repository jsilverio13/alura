import { InjectRepository } from '@nestjs/typeorm';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';
import { CriaProdutoDTO } from './dto/criaProduto.dto';

@Injectable()
export class ProdutoService {
	constructor(
		@InjectRepository(ProdutoEntity)
		private readonly produtoRepository: Repository<ProdutoEntity>,
	) {}

	async criaProduto(dadosProduto: CriaProdutoDTO) {
		const produto = new ProdutoEntity();

		Object.assign(produto, dadosProduto as ProdutoEntity);

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

		Object.assign(produto, dadosProduto as ProdutoEntity);

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
