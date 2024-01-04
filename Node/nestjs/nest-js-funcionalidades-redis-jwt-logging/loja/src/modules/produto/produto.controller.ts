import {
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Param,
	Post,
	Put,
	UseInterceptors,
} from '@nestjs/common';

import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';
import { CriaProdutoDTO } from './dto/criaProduto.dto';
import { ProdutoService } from './produto.service';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ProdutoEntity } from './produto.entity';

@Controller('produtos')
export class ProdutoController {
	constructor(
		private readonly produtoService: ProdutoService,
		@Inject(CACHE_MANAGER) private gerenciadorDeCache: Cache,
	) {}

	@Post()
	async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
		const produtoCadastrado = this.produtoService.criaProduto(dadosProduto);
		return produtoCadastrado;
	}

	@Get()
	@UseInterceptors(CacheInterceptor)
	async listaTodos() {
		return this.produtoService.listaProdutos();
	}

	@Get('/:id')
	async listaUm(@Param('id') id: string) {
		let produto = await this.gerenciadorDeCache.get<ProdutoEntity>(
			`produto-${id}`,
		);

		if (!produto) {
			console.log('Obtendo produto do cache!');
			produto = (await this.produtoService.listaUmProduto(id)) ?? undefined;

			if (!produto) {
				await this.gerenciadorDeCache.set(`produto-${id}`, produto);
			}
		}

		return {
			mensagem: 'Produto obtido com sucesso.',
			produto,
		};
	}

	@Put('/:id')
	async atualiza(
		@Param('id') id: string,
		@Body() dadosProduto: AtualizaProdutoDTO,
	) {
		const produtoAlterado = await this.produtoService.atualizaProduto(
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
		const produtoRemovido = await this.produtoService.removeProduto(id);

		return {
			mensagem: 'produto removido com sucesso',
			produto: produtoRemovido,
		};
	}
}
