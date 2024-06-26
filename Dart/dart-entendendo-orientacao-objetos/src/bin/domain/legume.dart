import 'alimento.dart';
import 'bolo.dart';

class Legume extends Alimento implements Bolo {
  bool isPrecisaCozinhar;

  Legume(super.nome, super.peso, super.cor, this.isPrecisaCozinhar);

  void cozinhar() {
    (isPrecisaCozinhar)
        ? print("Pronto, o $nome está cozinhado!")
        : print("Nem precisou cozinhar");
  }

  @override
  void assar() {
    throw UnimplementedError();
  }

  @override
  void fazerMassa() {
    throw UnimplementedError();
  }

  @override
  void separarIngredientes() {
    throw UnimplementedError();
  }
}
