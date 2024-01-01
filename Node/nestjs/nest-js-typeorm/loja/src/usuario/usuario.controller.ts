import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { CriaUsuarioDTO as CriaUsuarioDTO } from './dto/criaUsuario.dto';
import { UsuarioModel } from './usuario.model';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDto } from './dto/listaUsuario.dto';
import { AtualizaUsuarioDto } from './dto/atualizaUsuarioDto';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {
	constructor(private usuarioService: UsuarioService) {}

	@Post()
	async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
		const usuarioModel = new UsuarioModel();
		usuarioModel.email = dadosDoUsuario.email;
		usuarioModel.nome = dadosDoUsuario.nome;
		usuarioModel.senha = dadosDoUsuario.senha;
		usuarioModel.id = uuid();
		this.usuarioService.criaUsuario(usuarioModel);

		return {
			usuario: new ListaUsuarioDto(usuarioModel.id, usuarioModel.nome),
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
