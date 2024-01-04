import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { UsuarioModule } from '../usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
	controllers: [AutenticacaoController],
	providers: [AutenticacaoService],
	imports: [
		UsuarioModule,
		JwtModule.register({
			global: true,
			secret: 'SEGREDO_SECRETO',
			signOptions: { expiresIn: '72h' },
		}),
	],
})
export class AutenticacaoModule {}
