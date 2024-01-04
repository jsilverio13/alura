import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { EmailUnico } from '../validacao/email-unico.validator';

export class CriaUsuarioDTO {
	@IsNotEmpty({ message: 'O nome não pode ser vazio' })
	nome: string;

	@IsEmail(undefined, { message: 'O e-mail informado é inválido' })
	@EmailUnico({ message: 'Já existe um usuário com este e-mail' })
	email: string;

	@Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W+)(.{6,30})$/, {
		message:
			'A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um dígito, um caractere especial e ter entre 8 e 30 caracteres',
	})
	senha: string;
}
