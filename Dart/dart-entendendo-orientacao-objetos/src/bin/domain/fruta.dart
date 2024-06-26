import 'alimento.dart';
import 'bolo.dart';

class Fruta extends Alimento implements Bolo {
  int diaDesdeColheita;
  bool? isMadura;

  Fruta(super.nome, super.peso, super.cor, this.diaDesdeColheita,
      {this.isMadura});

  void estaMadura(int diasParaMadura) {
    isMadura = diaDesdeColheita >= diasParaMadura;
    print('A sua $nome foi colhida há $diaDesdeColheita e precisa de '
        '$diasParaMadura para poder comer. Ela está madura? $isMadura');
  }

  void fazerSuco() {
    print("Você fez um belo suco de $nome");
  }

  @override
  void separarIngredientes() {
    print("Catar a fruta");
  }

  @override
  void fazerMassa() {
    print("Mistura, mistura.");
  }

  @override
  void assar() {
    print("Por no forno!");
  }
}
