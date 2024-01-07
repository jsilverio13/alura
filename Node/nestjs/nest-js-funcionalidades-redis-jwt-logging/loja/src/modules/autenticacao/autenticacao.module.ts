import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
	controllers: [AutenticacaoController],
	providers: [AutenticacaoService],
	imports: [
		UsuarioModule,
		JwtModule.registerAsync({
			useFactory: (configService: ConfigService) => {
				return {
					secret: configService.get<string>('SEGREDO_JWT'),
					signOptions: { expiresIn: '72h' },
				};
			},
			inject: [ConfigService],
			global: true,
		}),
	],
})
export class AutenticacaoModule {}
