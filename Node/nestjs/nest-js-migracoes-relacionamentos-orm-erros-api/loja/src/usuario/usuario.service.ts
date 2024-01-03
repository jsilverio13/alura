import { UsuarioModel } from './usuario.model';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDto } from './dto/listaUsuario.dto';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDto } from './dto/atualizaUsuarioDto';
import { CriaUsuarioDTO } from './dto/criaUsuario.dto';

@Injectable()
export class UsuarioService {
	constructor(
		@InjectRepository(UsuarioModel)
		private readonly usuarioRepository: Repository<UsuarioModel>,
	) {}

	async listaUsuarios() {
		const usuariosSalvos = await this.usuarioRepository.find();
		const usuariosLista = usuariosSalvos.map(
			(usuario) => new ListaUsuarioDto(usuario.id, usuario.nome),
		);

		return usuariosLista;
	}

	async criaUsuario(dadosUsuario: CriaUsuarioDTO) {
		const usuarioModel = new UsuarioModel();
		usuarioModel.email = dadosUsuario.email;
		usuarioModel.nome = dadosUsuario.nome;
		usuarioModel.senha = dadosUsuario.senha;
		await this.usuarioRepository.save(usuarioModel);

		return usuarioModel;
	}

	async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDto) {
		const usuario = await this.buscarPorId(id);

		Object.entries(novosDados).forEach(([chave, valor]) => {
			if (chave === 'id') {
				return;
			}

			usuario[chave] = valor;
		});

		await this.usuarioRepository.update(id, usuario);
	}

	async removeUsuario(id: string) {
		const usuario = await this.buscarPorId(id);

		await this.usuarioRepository.delete(usuario.id);
	}

	async existeComEmail(email: string) {
		const possivelUsuario = await this.usuarioRepository.findOneBy({
			email: email,
		});
		return possivelUsuario !== null;
	}

	private async buscarPorId(id: string) {
		const possivelUsuario = await this.usuarioRepository.findOneBy({ id: id });

		if (!possivelUsuario) {
			throw new NotFoundException('Usuário não existe');
		}
		return possivelUsuario;
	}
}
