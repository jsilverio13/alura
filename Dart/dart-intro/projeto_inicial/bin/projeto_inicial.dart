void main() {
  int idade = 27;
  double altura = 1.80;
  bool geek = true;
  const String nome = 'Jefferson Silverio';
  final String apelido;
  apelido = 'Jeff';
  bool maiorDeIdade = idade >= 18 ? true : false;
  int energia = 100;

  List<dynamic> jeff = [idade, altura, geek, nome, apelido];

  for (int i = 1; i <= 5; i++) {
    print('Concluí $i voltas');
  }

  while (energia > 0) {
    print('Mais uma Repetição');
    energia = energia - 15;
  }

  String frase = 'Eu sou ${jeff[4]} \n'
      'mas meu nome completo é: ${jeff[3]}, \n'
      'eu me considero geek? ${jeff[2]}. \n'
      'Eu tenho ${jeff[1]} metros de altura e \n'
      '${jeff[0]} anos de idade, \n'
      'Eu sou maior de idade? $maiorDeIdade \n';

  print(frase);
}
