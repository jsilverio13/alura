import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO as CriaUsuarioDTO } from './dto/criaUsuario.dto';
import { UsuarioModel } from './usuario.model';
import { v4 as uuid } from 'uuid';
import { ListaUsuarioDto } from './dto/listaUsuario.dto';
import { AtualizaUsuarioDto } from './dto/atualizaUsuarioDto';

@Controller('/usuarios')
export class UsuarioController {
	constructor(private usuarioRepository: UsuarioRepository) {}

	@Post()
	async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
		const usuarioModel = new UsuarioModel();
		usuarioModel.email = dadosDoUsuario.email;
		usuarioModel.nome = dadosDoUsuario.nome;
		usuarioModel.senha = dadosDoUsuario.senha;
		usuarioModel.id = uuid();
		this.usuarioRepository.salvar(usuarioModel);

		return {
			usuario: new ListaUsuarioDto(usuarioModel.id, usuarioModel.nome),
			mensagem: 'usuário criado com sucesso',
		};
	}

	@Get()
	async listaUsuarios() {
		const usuariosSalvos = await this.usuarioRepository.listar();
		const usuariosLista = usuariosSalvos.map(
			(usuario) => new ListaUsuarioDto(usuario.id, usuario.nome),
		);

		return usuariosLista;
	}

	@Put('/:id')
	async atualizaUsuario(
		@Param('id') id: string,
		@Body() novosDados: AtualizaUsuarioDto,
	) {
		const usuarioAtualizado = await this.usuarioRepository.atualizar(
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
		const usuarioRemovido = await this.usuarioRepository.remover(id);

		return {
			usuario: usuarioRemovido,
			mensagem: 'usuário removido com sucesso',
		};
	}
}
