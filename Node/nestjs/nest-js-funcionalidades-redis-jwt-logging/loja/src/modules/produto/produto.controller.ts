import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	UseInterceptors,
} from '@nestjs/common';

import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';
import { CriaProdutoDTO } from './dto/criaProduto.dto';
import { ProdutoService } from './produto.service';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('produtos')
export class ProdutoController {
	constructor(private readonly produtoService: ProdutoService) {}

	@Post()
	async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
		const produtoCadastrado = this.produtoService.criaProduto(dadosProduto);
		return produtoCadastrado;
	}

	@Get()
	async listaTodos() {
		return this.produtoService.listaProdutos();
	}

	@Get('/:id')
	@UseInterceptors(CacheInterceptor)
	async listaUm(@Param('id') id: string) {
		return this.produtoService.listaUmProduto(id);
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
