import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { CriaUsuarioDTO } from './dto/criaUsuario.dto';
import { ListaUsuarioDto } from './dto/listaUsuario.dto';
import { AtualizaUsuarioDto } from './dto/atualizaUsuarioDto';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
	constructor(private usuarioService: UsuarioService) {}

	@Post()
	async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
		const usuario = await this.usuarioService.criaUsuario(dadosDoUsuario);

		return {
			usuario: new ListaUsuarioDto(usuario.id, usuario.nome),
			mensagem: 'usuário criado com sucesso',
		};
	}

	@Get()
	async listaUsuarios() {
		return this.usuarioService.listaUsuarios();
	}

	@Put('/:id')
	async atualizaUsuario(
		@Param('id') id: string,
		@Body() novosDados: AtualizaUsuarioDto,
	) {
		const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
			id,
			novosDados,
		);
		return {
			usuario: usuarioAtualizado,
			mensagem: 'usuário atualizado com sucesso',
		};
	}

	@Delete('/:id')
	async removeUsuario(@Param('id') id: string) {
		const usuarioRemovido = await this.usuarioService.removeUsuario(id);

		return {
			usuario: usuarioRemovido,
			mensagem: 'usuário removido com sucesso',
		};
	}
}
