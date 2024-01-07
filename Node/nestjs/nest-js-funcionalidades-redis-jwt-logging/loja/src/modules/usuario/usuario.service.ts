import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './dto/listaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDTO } from './dto/atualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/criaUsuario.dto';

@Injectable()
export class UsuarioService {
	constructor(
		@InjectRepository(UsuarioEntity)
		private readonly usuarioRepository: Repository<UsuarioEntity>,
	) {}

	async criaUsuario(dadosDoUsuario: CriaUsuarioDTO) {
		const usuarioEntity = new UsuarioEntity();

		Object.assign(usuarioEntity, dadosDoUsuario as UsuarioEntity);

		return this.usuarioRepository.save(usuarioEntity);
	}

	async listaUsuarios() {
		const usuariosSalvos = await this.usuarioRepository.find();
		const usuariosLista = usuariosSalvos.map(
			(usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
		);
		return usuariosLista;
	}

	async buscaPorEmail(email: string) {
		const checkEmail = await this.usuarioRepository.findOne({
			where: { email },
		});

		if (checkEmail === null)
			throw new NotFoundException('O email não foi encontrado.');

		return checkEmail;
	}

	async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
		const usuario = await this.buscarPorId(id);

		Object.assign(usuario, novosDados as UsuarioEntity);

		return this.usuarioRepository.save(usuario);
	}

	async deletaUsuario(id: string) {
		const usuario = await this.buscarPorId(id);

		await this.usuarioRepository.delete(usuario.id);

		return usuario;
	}

	private async buscarPorId(id: string) {
		const possivelUsuario = await this.usuarioRepository.findOneBy({ id: id });

		if (!possivelUsuario) {
			throw new NotFoundException('Usuário não existe');
		}
		return possivelUsuario;
	}
}
