from modelos.avaliacao import Avaliacao

class Restaurante:
    restaurantes = []

    def __init__(self, nome, categoria) -> None:
        self._nome = nome.title()
        self._categoria = categoria.upper()
        self._ativo = False
        self._avaliacao = []
        Restaurante.restaurantes.append(self)

    def __str__(self) -> str:
        return f"{self.nome} | {self.categoria}"

    @classmethod
    def listar_restaurantes(cls):
        print(f"{"Nome do restaurante".ljust(25)} | {"Categoria".ljust(25)} | {"Avaliação".ljust(25)} | {"Status"}")
        for restaurante in cls.restaurantes:
            print(
                f"{restaurante._nome.ljust(25)} | {restaurante._categoria.ljust(25)} | {str(restaurante.media_avalicoes).ljust(25)} | {restaurante.ativo}"
            )

    @property
    def ativo(self):
        return "✅" if self._ativo else "❌"


    def alternar_estado(self):
        self._ativo = not self._ativo
        
    def receber_avaliacao(self, cliente, nota):
        if 0 < nota <= 5:
            avalicao = Avaliacao(cliente, nota)
            self._avaliacao.append(avalicao)
       
    @property 
    def media_avalicoes(self):
        if not self._avaliacao:
            return "-"
        
        soma_das_notas = sum(avaliacao._nota for avaliacao in self._avaliacao)
        quantidade_de_notas = len(self._avaliacao)
        media = round(soma_das_notas / quantidade_de_notas, 1)
        return media
        

