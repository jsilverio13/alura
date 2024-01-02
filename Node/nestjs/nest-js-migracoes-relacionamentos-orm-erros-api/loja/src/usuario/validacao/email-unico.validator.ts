import { Injectable } from '@nestjs/common';
import {
	ValidationArguments,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	registerDecorator,
} from 'class-validator';
import { UsuarioService } from '../usuario.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailUnicoValidator implements ValidatorConstraintInterface {
	constructor(private usuarioService: UsuarioService) {}
	async validate(
		value: any,
		validationArguments?: ValidationArguments,
	): Promise<boolean> {
		const usuarioComEmailExiste =
			await this.usuarioService.existeComEmail(value);
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
