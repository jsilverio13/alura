class Aula01 {
  static void run() {
    print('\n');
    print('---------------------------------------');
    print('Aula 01');
    print('---------------------------------------');
    String nome = "Laranja";
    double peso = 100.2;
    String cor = "Verde e Amarela";
    String sabor = "Doce e cítrica";
    int diasDesdeColheita = 40;
    bool? isMadura;

    if (diasDesdeColheita >= 30) {
      isMadura = true;
    } else {
      isMadura = false;
    }

    print("A $nome pesa $peso gramas e é $cor e "
        "tem sabor $sabor e está madura? $isMadura");
  }
}
