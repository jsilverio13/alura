import random

def jogar():
    print("#################################")
    print("Bem vindo ao jogo de Adivinhação!")
    print("#################################")

    numero_secreto = int(random.randrange(1,101))
    total_de_tentativas = 0
    rodada = 1
    pontos = 1000

    print("Qual nível de dificuldade?")
    print("(1) Fácil (2) Médio (3) Difícil")

    nivel = int(input("Escolha o nível: "))

    if(nivel == 1):
        total_de_tentativas = 20
    elif(nivel == 2):
        total_de_tentativas = 10
    else:
        total_de_tentativas = 5

    for rodada in range(1, total_de_tentativas + 1):
        print("Tentativa {} de: {} ".format(rodada, total_de_tentativas))
        chute = int(input("Digite um número entre 1 e 100: "))

        if(chute < 1 or chute > 100):
            print("Você deve digitar um número entre 1 e 100!")
            continue

        acertou = chute == numero_secreto
        maior = chute > numero_secreto
        menor = chute < numero_secreto

        print("Você chutou ", chute)

        if(acertou):
            print("Você acertou e fez {} pontos".format((pontos)))
            break
        else:
            pontos_perdidos = abs(numero_secreto - chute)
            pontos = pontos - pontos_perdidos
            if(maior):
                print("Você errou! Seu chute foi maior que o número secreto.")
            elif(menor):
                print("Você errou! Seu chute foi menor que o número secreto.")


    print("#################################")
    print("Fim do jogo de Adivinhação! O número correto era {}".format(numero_secreto))
    print("#################################")

if(__name__ == "__main__"):
    jogar()