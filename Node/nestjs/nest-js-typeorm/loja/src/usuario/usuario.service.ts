import { UsuarioModel } from './usuario.model';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaUsuarioDto } from './dto/listaUsuario.dto';
import { Repository } from 'typeorm';
import { AtualizaUsuarioDto } from './dto/atualizaUsuarioDto';

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

	async criaUsuario(usuarioModel: UsuarioModel) {
		await this.usuarioRepository.save(usuarioModel);
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
			throw new Error('Usuário não existe');
		}

		return possivelUsuario;
	}
}
