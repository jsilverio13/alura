import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';
import { AtualizaUsuarioDTO } from './dto/atualizaUsuario.dto';

@Injectable()
export class UsuarioRepository {
	private usuarios: UsuarioEntity[] = [];

	salvar(usuario: UsuarioEntity) {
		this.usuarios.push(usuario);
	}

	async listar() {
		return this.usuarios;
	}

	async atualizar(id: string, novosDados: Partial<UsuarioEntity>) {
		const usuario = this.buscarPorId(id);

		Object.entries(novosDados).forEach(([chave, valor]) => {
			if (chave === 'id') {
				return;
			}

			usuario[chave] = valor;
		});

		return usuario;
	}

	remover(id: string) {
		const usuario = this.buscarPorId(id);

		this.usuarios = this.usuarios.filter(
			(usuarioSalvo) => usuarioSalvo.id !== id,
		);

		return usuario;
	}

	private buscarPorId(id: string) {
		const possivelUsuario = this.usuarios.find(
			(usuarioSalvo) => usuarioSalvo.id === id,
		);

		if (!possivelUsuario) {
			throw new Error('Usuário não existe');
		}

		return possivelUsuario;
	}
	async existeComEmail(email: string) {
		const possivelUsuario = this.usuarios.find(
			(usuario) => usuario.email === email,
		);

		return possivelUsuario !== undefined;
	}
}