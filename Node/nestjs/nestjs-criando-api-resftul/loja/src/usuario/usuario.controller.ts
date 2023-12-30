import { Body, Controller, Post } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO as CriaUsuarioDTO } from './dto/criaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioRepository: UsuarioRepository) {}

  @Post()
  async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {
    this.usuarioRepository.salvar(dadosDoUsuario);
    return this.usuarioRepository.listar();
  }
}
