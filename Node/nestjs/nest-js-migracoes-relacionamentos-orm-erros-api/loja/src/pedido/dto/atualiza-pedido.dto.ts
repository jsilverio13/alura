import { IsEnum } from 'class-validator';
import { PedidoStatus } from '../enum/pedido-status.enum';

export class AtualizaPedidoDto {
	@IsEnum(PedidoStatus)
	status: PedidoStatus;
}
