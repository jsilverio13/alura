import { UsuarioEntity } from './usuario.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDTO } from './dto/listaUsuario.dto';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDTO } from './dto/atualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/criaUsuario.dto';

@Injectable()
export class UsuarioService {
	constructor(
		@InjectRepository(UsuarioEntity)
		private readonly usuarioRepository: Repository<UsuarioEntity>,
	) {}

	async listaUsuarios() {
		const usuariosSalvos = await this.usuarioRepository.find();
		const usuariosLista = usuariosSalvos.map(
			(usuario) => new ListaUsuarioDTO(usuario.id, usuario.nome),
		);

		return usuariosLista;
	}

	async criaUsuario(dadosUsuario: CriaUsuarioDTO) {
		const usuario = new UsuarioEntity();
		Object.assign(usuario, dadosUsuario as UsuarioEntity);

		await this.usuarioRepository.save(usuario);

		return usuario;
	}

	async listaUmUsuario(id: string) {
		const usuario = await this.buscarPorId(id);

		return new ListaUsuarioDTO(usuario.id, usuario.nome);
	}

	async atualizaUsuario(id: string, novosDados: AtualizaUsuarioDTO) {
		const usuario = await this.buscarPorId(id);

		Object.assign(usuario, novosDados as UsuarioEntity);
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

	async buscaPorEmail(email: string) {
		const possivelUsuario = await this.usuarioRepository.findOneBy({
			email: email,
		});
		if (!possivelUsuario) throw new NotFoundException('Usuário não encontrato');

		return possivelUsuario;
	}

	private async buscarPorId(id: string) {
		const possivelUsuario = await this.usuarioRepository.findOneBy({ id: id });

		if (!possivelUsuario) {
			throw new NotFoundException('Usuário não existe');
		}
		return possivelUsuario;
	}
}
