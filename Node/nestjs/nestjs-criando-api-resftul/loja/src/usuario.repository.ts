export class UsuarioRepository {
  private usuarios = [];

  salvar(usuario) {
    this.usuarios.push(usuario);
    console.log(this.usuarios);
  }
}
