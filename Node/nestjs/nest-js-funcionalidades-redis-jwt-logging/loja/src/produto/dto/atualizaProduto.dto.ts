import { PartialType } from '@nestjs/mapped-types';
import { CriaProdutoDTO } from './criaProduto.dto';

export class AtualizaProdutoDTO extends PartialType(CriaProdutoDTO) {}
