import 'package:projeto_inicial/projeto_inicial.dart' as projeto_inicial;

void main(List<String> arguments) {
  print('Hello world: ${projeto_inicial.calculate()}! \n');

  //Aula 01
  int idade = 29;
  double altura = 1.80;
  bool geek = true;
  const String nome = 'Jefferson';
  final String apelido = 'Jeff';
  int energia = 100;

  String frase = 'Eu sou $apelido \n'
      'mas meu nome completo é: $nome, \n'
      'eu me considero geek? $geek. \n'
      'Eu tenho $altura metros de altura e \n'
      '$idade anos de idade';

  print(frase);

  //Aula 02
  List<String> listaNomes = ['Ricarth', 'Natália', 'Alex', 'Ândriu', 'André'];

  print("\nTamanho da lista ${listaNomes.length}");

  List<dynamic> jeff = [idade, altura, geek, nome, apelido];

  String fraseComLista = '\n'
      'Eu sou ${jeff[4]} \n'
      'mas meu nome completo é: ${jeff[3]}, \n'
      'eu me considero geek? ${jeff[2]}. \n'
      'Eu tenho ${jeff[1]} metros de altura e \n'
      '${jeff[0]} anos de idade';

  print(fraseComLista);

  //Aula 03
  bool maiorDeIdade;
  if (idade >= 18) {
    maiorDeIdade = true;
  } else {
    maiorDeIdade = false;
  }

  String fraseComMaiorIdade = '\nEu sou ${jeff[4]} \n'
      'mas meu nome completo é: ${jeff[3]}, \n'
      'eu me considero geek? ${jeff[2]}. \n'
      'Eu tenho ${jeff[1]} metros de altura e \n'
      '${jeff[0]} anos de idade, \n'
      'Eu sou maior de idade? $maiorDeIdade';

  print(fraseComMaiorIdade);

  //Aula 04
  for (int i = 0; i < 5; i = i + 2) {
    print('\nConcluí $i voltas');
  }

  do {
    energia = energia - 20;
    print("Mais uma repetição energia em: $energia");
  } while (energia > 0);
}
