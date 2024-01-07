import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { UsuarioEntity } from './usuario.entity';
import { EmailUnicoValidator } from './validacao/email-unico.validator';

@Module({
	imports: [TypeOrmModule.forFeature([UsuarioEntity])],
	controllers: [UsuarioController],
	providers: [UsuarioService, EmailUnicoValidator],
	exports: [UsuarioService],
})
export class UsuarioModule {}
