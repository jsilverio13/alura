import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../usuario.repository';
import {
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	registerDecorator,
} from 'class-validator';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnicoValidator implements ValidatorConstraintInterface {
	constructor(private usuarioRepository: UsuarioRepository) {}
	async validate(
		value: any,
		validationArguments?: ValidationArguments,
	): Promise<boolean> {
		const usuarioComEmailExiste =
			await this.usuarioRepository.existeComEmail(value);
		return !usuarioComEmailExiste;
	}
}

export const EmailUnico = (opcoesValidacao: ValidationOptions) => {
	return (objeto: Object, propiedade: string) => {
		registerDecorator({
			target: objeto.constructor,
			propertyName: propiedade,
			options: opcoesValidacao,
			constraints: [],
			validator: EmailUnicoValidator,
		});
	};
};
