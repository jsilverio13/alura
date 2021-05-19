carol = '11,Carol,carol@carol.com.br\n'
andressa = '12,Andressa,andressa@andressa.com.br\n'

with open('dados/contatos-escrita.csv', encoding='latin_1', mode='a') as arquivo_contatos1:
    arquivo_contatos1.write(carol)
with open('dados/contatos-escrita.csv', encoding='latin_1', mode='a') as arquivo_contatos2:
    arquivo_contatos2.write(andressa)

