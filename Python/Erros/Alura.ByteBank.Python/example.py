def dividir(dividendo, divisor):
    if not(isinstance(dividendo, int) and isinstance(divisor, int)):
        raise ValueError("dividir() deve receber apenas argumentos inteiros")
    try:
        aux = dividendo / divisor
        return aux
    except Exception:
        print(f'Não foi possível dividir {dividendo} por {divisor}')
        raise


def testa_divisao(divisor):
    resultado = dividir(10, divisor)
    print(f'O resultado da divisao de 10 por {divisor} é {resultado}')


try:
    testa_divisao(2.5)
except ZeroDivisionError as E:
    print("Erro divisao por zero")

print("Programa encerrado")
