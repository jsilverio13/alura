class Aula02 {
  static void run() {
    print('\n');
    print('---------------------------------------');
    print('Aula 02');
    print('---------------------------------------');
    String nome = "Laranja";
    int diasDesdeColheita = 40;
    mostrarMadura(nome, diasDesdeColheita, cor: "Verde e Amarela");

    print("Faltam ${funcQuantosDiasMadura(10)} "
        "dias para a $nome ficar madura.");
  }
}

int funcQuantosDiasMadura(int dias) {
  int diasParaMadura = 30;
  int quantosDiasFaltam = diasParaMadura - dias;
  return quantosDiasFaltam;
}

bool funcEstaMadura(int dias) {
  if (dias >= 30) {
    return true;
  } else {
    return false;
  }
}

mostrarMadura(String nome, int dias, {required String cor}) {
  if (funcEstaMadura(dias)) {
    print("A $nome está madura.");
  } else {
    print("A $nome não está madura.");
  }

  print("A $nome é $cor.");
}
