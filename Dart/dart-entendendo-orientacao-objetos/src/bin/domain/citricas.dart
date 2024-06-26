import 'fruta.dart';

class Citricas extends Fruta {
  double nivelAzedo;

  Citricas(super.nome, super.peso, super.cor, super.diaDesdeColheita,
      this.nivelAzedo);

  void existeRefri(bool existe) {
    (existe)
        ? print("Existe refri de $nome")
        : print("Não existe refri de $nome");
  }

  @override
  void fazerMassa() {
    print("Tirar sementes");
    super.fazerMassa();
  }
}
