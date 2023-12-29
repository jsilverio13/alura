import { Body, Controller, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';

@Controller('/usuarios')
export class UsuarioController {
  private usuarioRepository = new UsuarioRepository();

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: any) {
    this.usuarioRepository.salvar(dadosDoUsuario);
    return dadosDoUsuario;
  }
}
