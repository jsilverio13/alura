from modelos.restaurante import Restaurante

restaurante_praca = Restaurante("praça", "Gourmet")
restaurante_pizza = Restaurante("pizza", "Italiana")
restaurante_sushi = Restaurante("sushi", "Japonesa")

restaurante_praca.alternar_estado()
restaurante_praca.receber_avaliacao("Cliente 1", 4)
restaurante_praca.receber_avaliacao("Cliente 2", 8)
restaurante_praca.receber_avaliacao("Cliente 3", 5)
restaurante_praca.receber_avaliacao("Cliente 3", 5)
restaurante_sushi.receber_avaliacao("Cliente 2", 3)
restaurante_sushi.receber_avaliacao("Cliente 2", 4)


def main():
    Restaurante.listar_restaurantes()


if __name__ == "__main__":
    main()
