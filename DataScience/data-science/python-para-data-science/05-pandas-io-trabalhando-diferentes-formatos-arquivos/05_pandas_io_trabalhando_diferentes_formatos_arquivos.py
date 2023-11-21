# -*- coding: utf-8 -*-
"""05 - pandas-io-trabalhando-diferentes-formatos-arquivos.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1573bWVUElSTeH8OM9Fv4TkHnBduWZEK2

# Arquivos de Apoio
## https://github.com/alura-cursos/Pandas

# Aula 01 - Fazendo leitura de arquivos CSV
"""

import pandas as pd

URL = 'https://raw.githubusercontent.com/alura-cursos/Pandas/main/superstore_data.csv'
dados_mercado = pd.read_csv(URL)
dados_mercado.head()

URL_2 = 'https://raw.githubusercontent.com/alura-cursos/Pandas/main/superstore_data_ponto_virgula.csv'
dados_ponto_virgula = pd.read_csv(URL_2, sep=';')
dados_ponto_virgula.head()

dados_primeiras_linhas = pd.read_csv(URL, nrows=5)
dados_primeiras_linhas

dados_selecao = pd.read_csv(URL, usecols=['Id','Year_Birth', 'Income'])
dados_selecao.head()

dados_selecao = pd.read_csv(URL, usecols=[0,1,4])
dados_selecao.head()

dados_selecao.to_csv('clientes_mercado.csv', index=False)

clientes_mercado = pd.read_csv('/content/clientes_mercado.csv')
clientes_mercado

"""# Aula 02 - Utilizando planilhas"""

import pandas as pd

url = 'https://github.com/alura-cursos/Pandas/blob/main/emissoes_CO2.xlsx?raw=True'

dados_co2 = pd.read_excel(url)
dados_co2.head()

pd.ExcelFile(url).sheet_names

percapita = pd.read_excel(url, sheet_name='emissoes_percapita')
percapita.head()

fontes = pd.read_excel(url, sheet_name='fontes')
fontes.head()

intervalo = pd.read_excel(url, sheet_name='emissoes_C02', usecols='A:D')
intervalo.head()

intervalo_2 = pd.read_excel(url, sheet_name='emissoes_C02', usecols= 'A:D', nrows=10)
intervalo_2.head()

percapita.to_excel('co2_percapita.xlsx', index=False)

pd.read_excel('/content/co2_percapita.xlsx')

sheet_id = '1lzq0k-41-MbbS63C3Q9i1wPvLkSJt9zhr4Jolt1vEog'
url = f'https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet'
dados_co2_sheets = pd.read_csv(url)
dados_co2_sheets.head()

sheet_id = '1lzq0k-41-MbbS63C3Q9i1wPvLkSJt9zhr4Jolt1vEog'
sheet_name = 'emissoes_percapita'
url_percapita = f'https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet'
percapita_sheets = pd.read_csv(url_percapita)
percapita_sheets.head()

sheet_id = '1lzq0k-41-MbbS63C3Q9i1wPvLkSJt9zhr4Jolt1vEog'
sheet_name = 'fontes'
url_fontes = f'https://docs.google.com/spreadsheets/d/{sheet_id}/gviz/tq?tqx=out:csv&sheet={sheet_name}'
fontes_sheets = pd.read_csv(url_fontes)
fontes_sheets.head()

"""# Aula 03 - Manipulando arquivos JSON"""

import pandas as pd

dados_paciente = pd.read_json('https://raw.githubusercontent.com/alura-cursos/Pandas/main/pacientes.json')
dados_paciente.head()

dados_paciente2 = pd.read_json('https://raw.githubusercontent.com/alura-cursos/Pandas/main/pacientes_2.json')
dados_paciente2.head()

df_normalizado = pd.json_normalize(dados_paciente2['Pacientes'])
df_normalizado.head()

df_normalizado.to_json('historico_pacientes_normalizado.json')

dados = pd.read_json('/content/historico_pacientes_normalizado.json')
dados.head()

"""#Aula 04 - Lendo dados em HTML e XML"""

import pandas as pd

url_html = 'https://en.wikipedia.org/wiki/AFI%27s_100_Years...100_Movies'
dados_html = pd.read_html(url_html)
dados_html

type(dados_html)

len(dados_html)

top_filmes = dados_html[1]
top_filmes.head()

top_filmes.to_html('top_filmes.html')

top_filmes.to_csv('top_filmes_1998.csv',index=False)

pd.read_csv('/content/top_filmes_1998.csv')

url_xml = 'https://raw.githubusercontent.com/alura-cursos/Pandas/main/imdb_top_1000.xml'
dados_imdb = pd.read_xml(url_xml)
dados_imdb.head()

dados_imdb.to_xml('filmes_imdb.xml')

"""#Aula 05 -Trabalhando com banco de dados"""

!pip install sqlalchemy==1.4.48
import sqlalchemy
import pandas as pd

from sqlalchemy import create_engine, MetaData, Table, inspect

engine = create_engine('sqlite:///:memory:')

url = 'https://github.com/alura-cursos/Pandas/blob/main/clientes_banco.csv?raw=true'

dados = pd.read_csv(url)
dados.head()

dados.to_sql('clientes', engine, index=False)

inspector = inspect(engine)

print(inspector.get_table_names())

query = 'SELECT * FROM clientes WHERE Categoria_de_renda="Empregado"'
empregados = pd.read_sql(query, engine)
empregados.head()

empregados.to_sql('empregados', con=engine, index=False )

pd.read_sql_table('empregados', engine)

pd.read_sql_table('empregados', engine, columns=['ID_Cliente', 'Grau_escolaridade', 'Rendimento_anual'])

query = 'SELECT * FROM clientes'
pd.read_sql(query, engine)

query = 'DELETE FROM clientes WHERE ID_Cliente=5008804'
with engine.connect() as conn:
    conn.execute(query)

query = 'UPDATE clientes SET Grau_escolaridade="Ensino superior" WHERE ID_Cliente=5008808'
with engine.connect() as conn:
    conn.execute(query)

pd.read_sql_table('clientes', engine)
