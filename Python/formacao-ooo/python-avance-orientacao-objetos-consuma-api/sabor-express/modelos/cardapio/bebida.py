from modelos.cardapio.item_cardapio import ItemCardapio


class Bebida(ItemCardapio):
    def __init__(self, nome, preco, tamanho) -> None:
        super().__init__(nome, preco)
        self._tamanho = tamanho

    def __str__(self) -> str:
        return self._nome

    def aplicar_desconto(self):
        self._preco -= self._preco * 0.08
