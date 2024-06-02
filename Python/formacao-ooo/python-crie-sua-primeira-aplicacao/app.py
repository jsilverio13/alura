import os

restaurantes = [
    {"nome": "Sushi", "categoria": "Japonesa", "ativo": False},
    {"nome": "Pizza", "categoria": "Italiana", "ativo": True},
    {"nome": "Cantina", "categoria": "Italiana", "ativo": False},
]


def exibir_nome_do_programa():
    print(
        """
    ░██████╗░█████╗░██████╗░░█████╗░██████╗░  ███████╗██╗░░██╗██████╗░██████╗░███████╗░██████╗░██████╗
    ██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗  ██╔════╝╚██╗██╔╝██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝
    ╚█████╗░███████║██████╦╝██║░░██║██████╔╝  █████╗░░░╚███╔╝░██████╔╝██████╔╝█████╗░░╚█████╗░╚█████╗░
    ░╚═══██╗██╔══██║██╔══██╗██║░░██║██╔══██╗  ██╔══╝░░░██╔██╗░██╔═══╝░██╔══██╗██╔══╝░░░╚═══██╗░╚═══██╗
    ██████╔╝██║░░██║██████╦╝╚█████╔╝██║░░██║  ███████╗██╔╝╚██╗██║░░░░░██║░░██║███████╗██████╔╝██████╔╝
    ╚═════╝░╚═╝░░╚═╝╚═════╝░░╚════╝░╚═╝░░╚═╝  ╚══════╝╚═╝░░╚═╝╚═╝░░░░░╚═╝░░╚═╝╚══════╝╚═════╝░╚═════╝░  
    """
    )


def exibir_opcoes():
    print("1. Cadastrar restaurante")
    print("2. Listar restaurante")
    print("3. Alterar estado restaurante")
    print("4. Sair\n")


def opcao_invalida():
    print("Opção inválida!\n")
    voltar_ao_menu_principal()


def escolher_opcoes():
    try:
        opcao_escolhida = int(input("Escolha uma opção: "))
        print(f"Você escolheu a opção {opcao_escolhida} ")

        match opcao_escolhida:
            case 1:
                cadastrar_novo_restaurante()
            case 2:
                listar_restaurantes()
            case 3:
                alterar_estado_restaurante()
            case 4:
                finalizar_app()
            case _:
                opcao_invalida()
    except:
        opcao_invalida()


def cadastrar_novo_restaurante():
    """Essa função é responsável por cadastrar um novo restaurante
    - Nome do restaurante
    - Categoria

    Output:
    - Adiciona um novo restaurante à lista de restaurantes

    """
    exibir_subtitulo("Cadastro de novos restaurantes")

    nome_do_restaurante = input("Digite o nome do restaurante que deseja cadastrar: ")
    categoria = input(
        f"Digite o nome da categoria do restaurante {nome_do_restaurante}: "
    )
    dados_do_restaurante = {
        "nome": nome_do_restaurante,
        "categoria": categoria,
        "ativo": False,
    }

    restaurantes.append(dados_do_restaurante)

    print(f"O restaurante {nome_do_restaurante} foi cadastrado com sucesso")
    voltar_ao_menu_principal()


def listar_restaurantes():
    exibir_subtitulo("Listando os restaurantes")

    header = f'{"Nome do restaurante".ljust(22)} | {"Categoria".ljust(20)} | {"Status"}'
    linha = "-" * len(header)
    print(header)
    print(linha)

    for restaurante in restaurantes:
        nome = restaurante["nome"]
        categoria = restaurante["categoria"]
        ativo = restaurante["ativo"]
        print(f"- {nome.ljust(20)} | {categoria.ljust(20)} | {ativo}")

    voltar_ao_menu_principal()


def ativar_restaurante():
    pass


def alterar_estado_restaurante():
    exibir_subtitulo("Alterando estado do restaurante:")
    nome_restaurante = input(
        "Digite o nome do restaurante que deseja alterar o estado: "
    )
    restaurante_encontrado = False

    for restaurante in restaurantes:
        if nome_restaurante == restaurante["nome"]:
            restaurante_encontrado = True
            restaurante["ativo"] = not restaurante["ativo"]
            print(
                f"O restaurante  {nome_restaurante} foi ativado com sucesso"
                if restaurante["ativo"]
                else f"O restaurante {nome_restaurante} foi desativado com sucesso"
            )

    if not restaurante_encontrado:
        print("O restaurante não foi encontrado")

    voltar_ao_menu_principal()


def exibir_subtitulo(texto):
    limpar_tela()
    linha = "*" * (len(texto) + 4)
    print(linha)
    print(texto)
    print(linha)
    print()


def limpar_tela():
    os.system("clear")


def voltar_ao_menu_principal():
    print()
    input("Digite uma tecla para voltar ao menu principal: ")
    main()


def finalizar_app():
    limpar_tela()
    exibir_subtitulo("Encerrando aplicação...")


def main():
    exibir_nome_do_programa()
    exibir_opcoes()
    escolher_opcoes()


if __name__ == "__main__":
    main()
