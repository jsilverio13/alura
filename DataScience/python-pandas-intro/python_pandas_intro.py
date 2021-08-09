# -*- coding: utf-8 -*-
"""python-pandas-intro.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1RK1QmUVPH6xYb3abXQdeeHLpej4veJRZ

# **Relatório de Análise I**

## **Importando a base de dados**
"""

import pandas as pd

pd.read_csv('dados/aluguel.csv', sep=';')

dados = pd.read_csv('dados/aluguel.csv', sep=';')

dados.head()

type(dados)

dados.info()

dados.head(10)

"""## Informações Gerais sobre a base de dados"""

dados.dtypes

tipos_de_dados = pd.DataFrame(dados.dtypes, columns=['Tipos de Dados'])

tipos_de_dados.columns.name = 'Variáveis'

tipos_de_dados

dados.shape

dados.shape[0]

print(f'A base de dados apresenta {dados.shape[0]} registros (imóveis) e {dados.shape[1]} variáveis')



"""# **Relatório de Análise II**

## Tipos de Imóveis
"""

import pandas as pd

dados = pd.read_csv('dados/aluguel.csv', sep = ';')

dados.head(10)

dados['Tipo']

tipo_de_imovel = dados['Tipo']

type(tipo_de_imovel)

tipo_de_imovel.drop_duplicates()

tipo_de_imovel.drop_duplicates(keep='first', inplace=True)

tipo_de_imovel

"""## Organizando Visualização"""

tipo_de_imovel = pd.DataFrame(tipo_de_imovel)

tipo_de_imovel

tipo_de_imovel.index

range(tipo_de_imovel.shape[0])

for i in range(tipo_de_imovel.shape[0]):
  print(i)

tipo_de_imovel.index = range(tipo_de_imovel.shape[0])

tipo_de_imovel.index

tipo_de_imovel

tipo_de_imovel.columns.name = 'id'
tipo_de_imovel



"""# **Relatório de Análise III**

## Imóveis Residencias
"""

import pandas as pd

dados = pd.read_csv('dados/aluguel.csv', sep=';')

dados.head(10)

list(dados['Tipo'].drop_duplicates())

residencial = list(dados['Tipo'].drop_duplicates())

residencial = ['Quitinete',
 'Casa',
 
 'Apartamento',
 'Casa de Condomínio',

 'Casa de Vila'
]

residencial

dados.head(10)

dados['Tipo'].isin(residencial)

dados['Tipo'].isin(residencial).head(10)

selecao = dados['Tipo'].isin(residencial)
selecao

dados_residencial = dados[selecao]

list(dados_residencial['Tipo'].drop_duplicates())

dados_residencial.shape[0]

dados.shape[0]

dados_residencial.index = range(dados_residencial.shape[0])

dados_residencial

"""## Exportando a Base de Dados"""

dados_residencial.to_csv('dados/aluguel_residencial.csv', sep = ';')

dados_residencial_2 = pd.read_csv('dados/aluguel_residencial.csv', sep =';')

dados_residencial_2

dados_residencial.to_csv('dados/aluguel_residencial.csv', sep=';', index = False)

dados_residencial_3 = pd.read_csv('dados/aluguel_residencial.csv', sep =';')
dados_residencial_3

"""# **Relatório de Análise IV**

## Seleção e Frequências
"""

dados = pd.read_csv('dados/aluguel_residencial.csv', sep = ';')

dados.head(10)

#Selecione somente os imóveis classificados com tipo 'Apartamento'.
selecao = dados['Tipo'] == 'Apartamento'
n1 = dados[selecao].shape[0]
n1

#Selecione os imóveis classificados com tipos 'Casa', 'Casa de Condomínio' e 'Casa de Vila'.
selecao = (dados['Tipo'] == 'Casa') | (dados['Tipo'] == 'Casa de Condomínio') | (dados['Tipo'] == 'Casa de Vila')
n2 = dados[selecao].shape[0]
n2

#Selecione os imóveis com área entre 60 e 100 metros quadrados, incluindo os limites.
selecao = (dados['Area'] >= 60) & (dados['Area'] <= 100)
n3 = dados[selecao].shape[0]
n3

#Selecione os imóveis que tenham pelo menos 4 quartos e aluguel menor que R$ 2.000,00.
selecao = (dados['Quartos'] >= 4) & (dados['Valor'] < 2000)
n4 = dados[selecao].shape[0]
n4

print(f"Nº de imóveis classificados com tipo 'Apartamento' -> {n1}")
print(f"Nº de imóveis classificados com tipos 'Casa', 'Casa de Condomínio' e 'Casa de Vila'-> {n2}")
print(f"Nº de imóveis com área entre 60 e 100 metros quadrados, incluindo os limites -> {n3}")
print(f"Nº de imóveis que tenham pelo menos 4 quartos e aluguel menor que R$ 2.000,00 -> {n4}")

"""# **Relatório de Análise  V**

## Tratamento de Dados Faltantes
"""

dados = pd.read_csv('dados/aluguel_residencial.csv', sep = ';')

dados.head(10)

dados.isnull()

dados.info()

dados[dados['Valor'].isnull()]

dados[dados['Valor'].isnull()]

A = dados.shape[0]
dados.dropna(subset = ['Valor'], inplace = True)
B = dados.shape[0]
A - B

dados[dados['Valor'].isnull()]

dados[dados['Condominio'].isnull()].shape[0]

selecao = (dados['Tipo'] == 'Apartamento') & (dados['Condominio'].isnull())

A = dados.shape[0]
dados = dados[~selecao]
B = dados.shape[0]
A - B

dados[dados['Condominio'].isnull()].shape[0]

selecao = (dados['Tipo'] == 'Apartamento') & (dados['Condominio'].isnull())

dados.fillna(0, inplace = True)

dados = dados.fillna({'Condominio': 0, 'IPTU': 0})

dados.info()

dados.to_csv('dados/aluguel_residencial.csv', sep = ';', index = False)

"""# **Relatório de Análise  VI**

## Criando Novas Variáveis
"""

import pandas as pd

dados = pd.read_csv('dados/aluguel_residencial.csv', sep = ';')

dados['Valor Bruto'] = dados['Valor'] + dados['Condominio'] + dados['IPTU']

dados['Valor m2'] = dados['Valor']/dados['Area']

dados['Valor m2'] = dados['Valor m2'].round(2)

dados['Valor Bruto m2'] = (dados['Valor Bruto']/dados['Area']).round(2)

casa = ['Casa', 'Casa de Condomínio', 'Casa de Vila']

dados['Tipo Agregado'] = dados['Tipo'].apply(lambda x: 'Casa' if x in casa else 'Apartamento')

dados['Tipo Agregado']

"""## Excluindo váriaveis"""

dados_aux = pd.DataFrame(dados[['Tipo Agregado', 'Valor m2', 'Valor Bruto', 'Valor Bruto m2']])
dados_aux.head()

del dados_aux['Valor Bruto']
dados_aux.head()

dados_aux.pop('Valor Bruto m2')
dados_aux.head()

dados.drop(['Valor Bruto', 'Valor Bruto m2'], axis =1, inplace = True)
dados.head()

dados.to_csv('dados/aluguel_residencial.csv', sep =';', index = False)

"""# **Relatório de Análise VII**

## Criando Agrupamentos
"""

dados = pd.read_csv('dados/aluguel_residencial.csv', sep = ';')
dados.head()

dados['Valor'].mean()

bairros = ['Barra da Tijuca', 'Copacabana', 'Ipanema', 'Leblon', 'Botafogo', 'Flamengo', 'Tijuca']
selecao = dados['Bairro'].isin(bairros)
dados = dados[selecao]

dados['Bairro'].drop_duplicates()

grupo_bairro = dados.groupby('Bairro')

for bairro in grupo_bairro: 
    print(bairro)

for bairro, data in grupo_bairro: 
    print(f'{bairro} -> {data.Valor.mean()}')

grupo_bairro['Valor'].mean()

grupo_bairro[['Valor', 'Condominio']].mean().round(2)

"""## Estatísticas Descritivas"""

grupo_bairro['Valor'].describe().round(2)

grupo_bairro['Valor'].aggregate(['min','max','sum'])

grupo_bairro['Valor'].aggregate(['min','max','sum']).rename(columns = {'min': 'Mínimo', 'max': 'Máximo', 'sum': 'Soma'})

# Commented out IPython magic to ensure Python compatibility.
# %matplotlib inline
import matplotlib.pyplot as plt
plt.rc('figure', figsize = (20,10))

fig = grupo_bairro['Valor'].mean().plot.bar(color = 'blue')
fig.set_ylabel('Valor do Aluguel')
fig.set_title('Valor Médio do aluguel por Bairro', {'fontsize': 22})

fig = grupo_bairro['Valor'].max().plot.bar(color = 'blue')
fig.set_ylabel('Valor do Aluguel')
fig.set_title('Valor Máximo do aluguel por Bairro', {'fontsize': 22})

"""# **Relatório de Análise  VIII**

# Identificando e Removendo Outliers
"""

# Commented out IPython magic to ensure Python compatibility.
# %matplotlib inline
import pandas as pd
import matplotlib.pyplot as plt
plt.rc('figure', figsize = (14,6))

dados = pd.read_csv('dados/aluguel_residencial.csv', sep =';')

dados.boxplot(['Valor'])

dados[dados['Valor'] >= 500000]

valor = dados['Valor']

Q1 = valor.quantile(.25)

Q1 = valor.quantile(.25)
Q3 = valor.quantile(.75)
IIQ = Q3 - Q1
limite_inferior = Q1 - 1.5 * IIQ
limite_superior = Q3 + 1.5 * IIQ

selecao = (valor >=limite_inferior) & (valor <= limite_superior)
dados_new = dados[selecao]

dados.hist(['Valor'])
dados_new.hist(['Valor'])

dados.boxplot(['Valor'], by = ['Tipo'])

grupo_tipo = dados.groupby('Tipo')

grupo_tipo = dados.groupby('Tipo')['Valor']

Q1 =  grupo_tipo.quantile(.25)
Q3 =  grupo_tipo.quantile(.75)
IIQ = Q3 - Q1
limite_inferior = Q1 - 1.5 * IIQ
limite_superior = Q3 + 1.5 * IIQ

limite_superior['Apartamento']

for tipo in grupo_tipo.groups.keys():
    print(tipo)

for tipo in grupo_tipo.groups.keys():
    eh_tipo = dados['Tipo'] == tipo
    eh_dentro_limite = (dados['Valor'] >= limite_inferior[tipo]) & (dados['Valor'] <= limite_superior[tipo])
    selecao = eh_tipo & eh_dentro_limite
    dados[selecao]

dados_new = pd.DataFrame()
for tipo in grupo_tipo.groups.keys():
    eh_tipo = dados['Tipo'] == tipo
    eh_dentro_limite = (dados['Valor'] >= limite_inferior[tipo]) & (dados['Valor'] <= limite_superior[tipo])
    selecao = eh_tipo & eh_dentro_limite
    dados_selecao = dados[selecao]
    dados_new = pd.concat([dados_new, dados_selecao])

dados_new.boxplot(['Valor'], by = ['Tipo'])

dados_new.to_csv('dados/aluguel_residencial_sem_outliers.csv', sep = ';', index = False)