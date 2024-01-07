import {
	ClassSerializerInterceptor,
	ConsoleLogger,
	Module,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresConfigService } from './config/postgres.config.service';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AutenticacaoModule } from './modules/autenticacao/autenticacao.module';
import { PedidoModule } from './modules/pedido/pedido.module';
import { ProdutoModule } from './modules/produto/produto.module';
import { FiltroDeExcecaoGlobal } from './resources/filtros/filtro-de-excecao-global';

@Module({
	imports: [
		UsuarioModule,
		ProdutoModule,
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		TypeOrmModule.forRootAsync({
			useClass: PostgresConfigService,
			inject: [PostgresConfigService],
		}),
		PedidoModule,
		CacheModule.registerAsync({
			useFactory: async () => ({
				store: await redisStore({ ttl: 10 * 1000 }),
			}),
			isGlobal: true,
		}),
		AutenticacaoModule,
	],
	controllers: [],
	providers: [
		{
			provide: APP_FILTER,
			useClass: FiltroDeExcecaoGlobal,
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ClassSerializerInterceptor,
		},
	],
})
export class AppModule {}
