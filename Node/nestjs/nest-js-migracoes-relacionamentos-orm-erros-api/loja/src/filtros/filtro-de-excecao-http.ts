import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';

@Catch()
export class FiltroDeExcecaoHttp implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		console.log(exception);
		const context = host.switchToHttp();
		const response = context.getResponse<Response>();
		const request = context.getRequest<Request>();

		const { status, body } =
			exception instanceof HttpException
				? {
						status: exception.getStatus(),
						body: exception.getResponse(),
					}
				: {
						status: HttpStatus.INTERNAL_SERVER_ERROR,
						body: {
							statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
							timeStamp: new Date().toString,
							path: request.url,
						},
					};

		response.status(status).json(body);
	}
}
