import sys

from src.leilao.excecoes import LanceInvalido


class Usuario:

    def __init__(self, nome, carteira):
        self.__nome = nome
        self.__carteira = carteira

    def propoe_lance(self, leilao, valor):
        if not self._valor_eh_valido(valor):
            raise LanceInvalido('Não pode propor um lance com o valor maior que o valor da carteira')

        lance = Lance(self, valor)
        leilao.propoe(lance)

        self.__carteira -= valor

    @property
    def nome(self):
        return self.__nome

    @property
    def carteira(self):
        return self.__carteira

    def _valor_eh_valido(self, valor):
        return valor <= self.__carteira


class Lance:

    def __init__(self, usuario, valor):
        self.usuario = usuario
        self.valor = valor


class Leilao:
    def __init__(self, descricao):
        self.maior_lance = sys.float_info.min
        self.menor_lance = sys.float_info.max
        self.descricao = descricao
        self.__lances = []

    def propoe(self, lance: Lance):
        if self.lance_eh_valido(lance):
            if not self._tem_lances():
                self.menor_lance = lance.valor

            self.maior_lance = lance.valor

            self.__lances.append(lance)
        else:
            raise LanceInvalido('Erro ao propor lance')


    @property
    def lances(self):
        return self.__lances[:]


    def _tem_lances(self):
        return self.__lances

    def _usuarios_diferentes(self, lance):
        if self.__lances[-1].usuario != lance.usuario:
            return True
        raise LanceInvalido('O mesmo usuário não pode dar dois lances seguidos')


    def _valor_maior_que_lance_anterior(self, lance):
        return lance.valor > self.__lances[-1].valor


    def lance_eh_valido(self, lance):
        return not self._tem_lances() or (self._usuarios_diferentes(lance) and
                                          self._valor_maior_que_lance_anterior(lance))
