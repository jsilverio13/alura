import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { EmailUnico } from '../validacao/email-unico.validator';

export class CriaUsuarioDTO {
	@IsNotEmpty({ message: 'O nome não pode ser vazio' })
	@IsString({ message: 'O nome deve ser uma string' })
	nome: string;

	@IsEmail(undefined, { message: 'O e-mail informado é inválido' })
	@EmailUnico({ message: 'Já existe um usuário com esse e-mail' })
	email: string;

	@MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
	senha: string;
}
