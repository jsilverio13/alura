import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { EmailUnicoValidator } from './validacao/email-unico.validator';
import { UsuarioEntity } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Module({
	imports: [TypeOrmModule.forFeature([UsuarioEntity])],
	controllers: [UsuarioController],
	providers: [EmailUnicoValidator, UsuarioService],
})
export class UsuarioModule {}
