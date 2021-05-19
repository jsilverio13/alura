# from cpf_cnpj import Documento
#
#
# cpf_um = "15316264754"
# #print(cpf_um)
#
# #exemplo_cnpj = "35379838000112"
# #exemplo_cpf = "11111111112"
#
# #cnpj = CNPJ()
# #print(cnpj.validate(exemplo_cnpj))
# documento = Documento.cria_documento(cpf_um)
# print(documento)

# from telefones_br import TelefonesBr
# import re
#
# telefone = "551934571935"
# telefone_objeto = TelefonesBr(telefone)
#
# #padrao = "([0-9]{2,3})?([0-9]{2})([0-9]{4,5})([0-9]{4})"
# #resposta = re.search(padrao,telefone)
# #print(resposta.group())
#
# # print(telefone_objeto)
# from datas_br import DatasBr
# from datetime import  datetime, timedelta
#
# cadastro = DatasBr()
#
# print(cadastro.momento_cadastro)
# print(cadastro.mes_cadastro())
# print(cadastro.dia_semana())
# print(cadastro.format_data())
#
# hoje = DatasBr()
# print(hoje.tempo_cadastro())


from acesso_cep import BuscaEndereco

cep = "13455186"
objeto_cep = BuscaEndereco(cep)

# r = requests.get("https://viacep.com.br/ws/01001000/json/")
# print(r.text)

bairro, cidade, uf = objeto_cep.acessa_via_cep()

print(bairro, ",", cidade, ",", uf)
