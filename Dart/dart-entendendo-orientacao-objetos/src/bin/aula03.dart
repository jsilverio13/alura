import 'domain/fruta.dart';

class Aula03 {
  static void run() {
    print('\n');
    print('---------------------------------------');
    print('Aula 03');
    print('---------------------------------------');
    Fruta fruta01 = Fruta("Banana", 100, "Amarela", 2, isMadura: true);
    Fruta fruta02 = Fruta("Maçã", 150, "Vermelha", 3, isMadura: false);

    print('Nome: ${fruta01.nome} Peso: ${fruta01.peso} Cor: ${fruta01.cor}');
    print('Nome: ${fruta02.nome} Peso: ${fruta02.peso} Cor: ${fruta02.cor}');
  }
}
