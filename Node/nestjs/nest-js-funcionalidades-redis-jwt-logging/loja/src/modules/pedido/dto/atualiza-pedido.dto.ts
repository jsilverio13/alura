import { IsEnum } from 'class-validator';
import { PedidoStatus } from '../enum/pedido-status.enum';

export class AtualizaPedidoDTO {
	@IsEnum(PedidoStatus)
	status: PedidoStatus;
}
