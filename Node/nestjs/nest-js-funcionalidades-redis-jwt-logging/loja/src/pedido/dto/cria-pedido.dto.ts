import { Type } from 'class-transformer';
import {
	ArrayMinSize,
	IsArray,
	IsInt,
	IsUUID,
	ValidateNested,
} from 'class-validator';

class ItemPedidoDTO {
	@IsInt()
	quantidade: number;

	@IsUUID()
	produtoId: string;
}

export class CriaPedidoDTO {
	@ValidateNested()
	@IsArray()
	@ArrayMinSize(1)
	@Type(() => ItemPedidoDTO)
	itensPedido: ItemPedidoDTO[];
}
