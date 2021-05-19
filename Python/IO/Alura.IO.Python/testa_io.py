with open('dados/contatos.csv', encoding='latin_1', mode='a+') as arquivo:
    print(type(arquivo.buffer))

    # texto_bytes = b'Esse texto e bytes'
    # print(texto_bytes)
    # print(conteudo)

    contato = bytes('15,Verônica, veronica@gmail.com.br\n', 'latin_1')
    arquivo.buffer.write(contato)



