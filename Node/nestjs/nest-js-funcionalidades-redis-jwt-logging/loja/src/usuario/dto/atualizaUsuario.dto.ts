import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsString,
	MinLength,
} from 'class-validator';
import { CriaUsuarioDTO } from './criaUsuario.dto';
import { PartialType } from '@nestjs/mapped-types';

export class AtualizaUsuarioDTO extends PartialType(CriaUsuarioDTO) {}
