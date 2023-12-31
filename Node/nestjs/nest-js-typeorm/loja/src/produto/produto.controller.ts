import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { randomUUID } from 'crypto';

import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';
import { CriaProdutoDTO } from './dto/criaProduto.dto';
import { ProdutoModel } from './produto.model';
import { ProdutoRepository } from './produto.repository';

@Controller('produtos')
export class ProdutoController {
	constructor(private readonly produtoRepository: ProdutoRepository) {}

	@Post()
	async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
		const produto = new ProdutoModel();

		produto.id = randomUUID();
		produto.nome = dadosProduto.nome;
		produto.usuarioId = dadosProduto.usuarioId;
		produto.valor = dadosProduto.valor;
		produto.quantidade = dadosProduto.quantidade;
		produto.descricao = dadosProduto.descricao;
		produto.categoria = dadosProduto.categoria;
		produto.caracteristicas = dadosProduto.caracteristicas;
		produto.imagens = dadosProduto.imagens;

		const produtoCadastrado = this.produtoRepository.salva(produto);
		return produtoCadastrado;
	}

	@Get()
	async listaTodos() {
		return this.produtoRepository.listaTodos();
	}

	@Put('/:id')
	async atualiza(
		@Param('id') id: string,
		@Body() dadosProduto: AtualizaProdutoDTO,
	) {
		const produtoAlterado = await this.produtoRepository.atualiza(
			id,
			dadosProduto,
		);

		return {
			mensagem: 'produto atualizado com sucesso',
			produto: produtoAlterado,
		};
	}

	@Delete('/:id')
	async remove(@Param('id') id: string) {
		const produtoRemovido = await this.produtoRepository.remove(id);

		return {
			mensagem: 'produto removido com sucesso',
			produto: produtoRemovido,
		};
	}
}
