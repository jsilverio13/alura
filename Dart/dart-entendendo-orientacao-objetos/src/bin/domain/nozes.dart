import 'fruta.dart';

class Nozes extends Fruta {
  double porcentagemOleoNatural;

  Nozes(super.nome, super.peso, super.cor, super.diaDesdeColheita,
      this.porcentagemOleoNatural);

  @override
  void fazerMassa() {
    print("Tirar a casca");
    super.fazerMassa();
  }
}
