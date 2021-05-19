from exceptions import SaldoInsuficienteError, OperacaoFinanceiraError
from leitor import LeitorDeArquivo


class Cliente:
    def __init__(self, nome, cpf, profissao):
        self.nome = nome
        self.cpf = cpf
        self.profissao = profissao


class ContaCorrente:
    total_contas_criadas = 0
    taxa_operacao = None

    def __init__(self, cliente, agencia, numero):
        self.__saldo = 100
        self.__agencia = 0
        self.__numero = 0
        self.cliente = cliente
        self.__set_agencia(agencia)
        self.__set_numero(numero)
        self.saques_nao_permitidos = 0
        self.transferencias_nao_permitidos = 0

        ContaCorrente.total_contas_criadas += 1
        ContaCorrente.taxa_operacao = 30 / ContaCorrente.total_contas_criadas

    @property
    def agencia(self):
        return self.__agencia

    def __set_agencia(self, value):
        if not isinstance(value, int):
            raise ValueError("O atributo agencia é inválido", value)

        if value <= 0:
            raise ValueError("O atributo agencia é inválido, deve ser maior que 0", value)

        self.__agencia = value

    @property
    def numero(self):
        return self.__saldo

    def __set_numero(self, value):
        if not isinstance(value, int):
            raise ValueError("O atributo numero é inválido", value)

        if value <= 0:
            raise ValueError("O atributo numero é inválido, deve ser maior que 0", value)

        self.__numero = value

    @property
    def saldo(self):
        return self.__saldo

    @saldo.setter
    def saldo(self, value):
        if not isinstance(value, int):
            raise ValueError("O atributo saldo é inválido", value)

        self.__saldo = value

    def transferir(self, valor, favorecido):
        if valor < 0:
            raise ValueError("O valor a ser transferido não pode ser menor que zero")
        try:
            self.sacar(valor)
        except SaldoInsuficienteError as E:
            self.transferencias_nao_permitidos += 1
            E.args = ()
            raise OperacaoFinanceiraError("Operação não finalizada", E)
            raise E
        favorecido.depositar(valor)

    def sacar(self, valor):
        if self.saldo < valor:
            self.saques_nao_permitidos += 1
            raise SaldoInsuficienteError('', self.saldo, valor)

        if valor < 0:
            raise ValueError("O valor a ser sacado não pode ser menor que zero")

        self.__saldo -= valor

    def depositar(self, valor):
        self.saldo += valor


# def main():
#     import sys
#
#     contas = []
#     while True:
#         try:
#             nome = input('Nome do cliente:\n')
#             agencia = input('Numero da agencia:\n')
#             breakpoint()
#             numero = input('Numero da conta corrente:\n')
#
#             cliente = Cliente(nome, None, None)
#             conta_corrente = ContaCorrente(cliente, agencia, numero)
#             contas.append(conta_corrente)
#         except ValueError as E:
#             print(E.args)
#             sys.exit()
#         except KeyboardInterrupt:
#             print(f'\n\n{len(contas)}(s) contas criadas')
#             sys.exit()
#

# if __name__ == '__main__':
#     main()

# conta_corrente = ContaCorrente(None, 400, 1234567)
# conta_corrente2 = ContaCorrente(None, 400, 1234567)
#
# try:
#     conta_corrente.depositar(50)
#     conta_corrente.transferir(200, conta_corrente2)
#
#     print(f'O Saldo da conta1 é {conta_corrente.saldo}')
#     print(f'O Saldo da conta2 é {conta_corrente2.saldo}')
# except OperacaoFinanceiraError as E:
#     breakpoint()
#     pass


with LeitorDeArquivo('arquivo.txt') as leitor:
    leitor.ler_proxima_linha()
    leitor.ler_proxima_linha()
    leitor.ler_proxima_linha()
    leitor.ler_proxima_linha()
