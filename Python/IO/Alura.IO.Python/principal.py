import contatos_util

try:

    contatos = contatos_util.csv_para_contatos('dados/contatos.csv')
    # contatos_util.contatos_para_pickle(contatos, 'dados/contatos.pickle')
    # contatos = contatos_util.pickle_para_contatos('dados/contatos.pickle')
    # contatos_util.contatos_para_json(contatos, 'dados/contatos.json')
    contatos = contatos_util.json_para_contatos('dados/contatos.json')

    for contato in contatos:
        print(f'Id: {contato.id} - Nome: {contato.nome} - Email: {contato.email}')
except FileNotFoundError:
    print('Arquivo não encontrado')
except PermissionError:
    print('Sem permissão de escrita')


