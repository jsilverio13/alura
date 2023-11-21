# -*- coding: utf-8 -*-
"""08 - pandas-limpeza-tratamento-dados.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1gsKd7BgBD-PmWth1Ey-fcZQ5-9DeokIE

# Conhecendo os dados
"""

import pandas as pd

!curl -o 'dataset-telecon.json' 'https://caelum-online-public.s3.amazonaws.com/2929-pandas/dataset-telecon.json'

dados_churn = pd.read_json("dataset-telecon.json")
dados_churn.head()

dados_churn['conta'][0]

pd.json_normalize(dados_churn['conta']).head()

pd.json_normalize(dados_churn['telefone']).head()

"""## Transformando dados em uma tabela"""

import json

with open("dataset-telecon.json") as f:
  json_bruto = json.load(f)

json_bruto

dados_normalizados = pd.json_normalize(json_bruto)
dados_normalizados.head()

"""# Transformação inicial dos dados

## Entendendo os dados

A base de dados contém colunas além do ID dos clientes e o churn:

<b>Cliente:</b>
 
* `genero`: gênero (masculino e feminino)
* `idoso`: informação sobre um cliente ter ou não idade igual ou maior que 65 anos
* `parceiro`: se o cliente possui ou não um parceiro ou parceira
* `dependentes`: se o cliente possui ou não dependentes
* `tempo_servico`: meses de contrato do cliente

<b>Serviço de telefonia</b>

 * `servico_telefone`: assinatura de serviço telefônico
 * `varias_linhas`: assinatura de mais de uma linha de telefone
 

<b>Serviço de internet</b>


 * `servico_internet`: assinatura de um provedor internet
 * `seguranca_online`: assinatura adicional de segurança online
 * `backup_online`: assinatura adicional de backup online
 * `protecao_dispositivo`: assinatura adicional de proteção no dispositivo
 * `suporte_tecnico`: assinatura adicional de suporte técnico, menos tempo de espera
 * `tv_streaming`: assinatura de TV a cabo
 * `filmes_streaming`: assinatura de streaming de filmes


<b>Conta</b>

 * `contrato`: tipo de contrato
 * `faturamente_eletronico`: se o cliente prefere receber online a fatura
 * `metodo_pagamento`: forma de pagamento
 * `cobranca.mensal`: total de todos os serviços do cliente por mês
 * `cobranca.Total`: total gasto pelo cliente
"""

dados_normalizados.info()

#dados_normalizados['conta.cobranca.Total'] = dados_normalizados['conta.cobranca.Total'].astype(float)

"""## Modificando o tipo da coluna"""

dados_normalizados[dados_normalizados['conta.cobranca.Total'] == ' '].head()

dados_normalizados[dados_normalizados['conta.cobranca.Total'] == ' '][
    ['cliente.tempo_servico', 'conta.contrato', 'conta.cobranca.mensal', 'conta.cobranca.Total']
]

idx = dados_normalizados[dados_normalizados['conta.cobranca.Total'] == ' '].index

dados_normalizados.loc[idx, "conta.cobranca.Total"] = dados_normalizados.loc[idx, "conta.cobranca.mensal"] * 24

dados_normalizados.loc[idx, "cliente.tempo_servico"] = 24

dados_normalizados.loc[idx][
    ['cliente.tempo_servico', 'conta.contrato', 'conta.cobranca.mensal', 'conta.cobranca.Total']
]

dados_normalizados['conta.cobranca.Total'] = dados_normalizados['conta.cobranca.Total'].astype(float)

dados_normalizados.info()

"""## Identificando e tratando strings vazias"""

for col in dados_normalizados.columns:
    print(f"Coluna: {col}")
    print(dados_normalizados[col].unique())
    print("-" * 30)

dados_normalizados.query("Churn == ''")

dados_sem_vazio = dados_normalizados[dados_normalizados['Churn'] != ''].copy()

dados_sem_vazio.info()

dados_sem_vazio.reset_index(drop=True, inplace=True)

dados_sem_vazio

"""# Trabalhando com dados duplicados e nulos

## Identificando e tratando dados duplicados
"""

dados_sem_vazio.duplicated()

dados_sem_vazio.duplicated().sum()

filtro_duplicadas = dados_sem_vazio.duplicated()
filtro_duplicadas

dados_sem_vazio[filtro_duplicadas]

dados_sem_vazio.drop_duplicates(inplace=True)

dados_sem_vazio.duplicated().sum()

"""## Identificando e substituindo dados nulos"""

dados_sem_vazio.isna()

dados_sem_vazio.isna().sum()

dados_sem_vazio.isna().sum().sum()

dados_sem_vazio[dados_sem_vazio.isna().any(axis=1)]

filtro = dados_sem_vazio['cliente.tempo_servico'].isna()

dados_sem_vazio[filtro][['cliente.tempo_servico', 'conta.cobranca.mensal', 'conta.cobranca.Total']]

import numpy as np

np.ceil(5957.90/90.45)

dados_sem_vazio['cliente.tempo_servico'].fillna(
    np.ceil(
        dados_sem_vazio['conta.cobranca.Total'] / dados_sem_vazio['conta.cobranca.mensal']
    ), inplace=True
)

dados_sem_vazio[filtro][['cliente.tempo_servico', 'conta.cobranca.mensal', 'conta.cobranca.Total']]

dados_sem_vazio.isna().sum()

"""## Retirando os dados nulos"""

dados_sem_vazio['conta.contrato'].value_counts()

colunas_dropar = ['conta.contrato', 'conta.faturamente_eletronico', 'conta.metodo_pagamento']

dados_sem_vazio[colunas_dropar].isna().any(axis=1).sum()

df_sem_nulo = dados_sem_vazio.dropna(subset=colunas_dropar).copy()
df_sem_nulo.head()

df_sem_nulo.reset_index(drop=True, inplace=True)

df_sem_nulo.isna().sum()

"""# Trabalhando com os outliers

## Identificando os outliers

![](https://i.imgur.com/Arb5cXL.png)
"""

df_sem_nulo.describe()

1080/12

import seaborn as sns

sns.boxplot(x=df_sem_nulo['cliente.tempo_servico'])

Q1 = df_sem_nulo['cliente.tempo_servico'].quantile(.25)
Q3 = df_sem_nulo['cliente.tempo_servico'].quantile(.75)
IQR = Q3-Q1
limite_inferior = Q1 - 1.5*IQR
limite_superior = Q3 + 1.5*IQR

outliers_index = (df_sem_nulo['cliente.tempo_servico'] < limite_inferior) | (df_sem_nulo['cliente.tempo_servico'] > limite_superior)
outliers_index

df_sem_nulo[outliers_index]['cliente.tempo_servico']

"""## Substituindo valores para os outliers"""

df_sem_out = df_sem_nulo.copy()

df_sem_out[outliers_index]['cliente.tempo_servico']

df_sem_out.loc[outliers_index, 'cliente.tempo_servico'] = np.ceil(
    df_sem_out.loc[outliers_index, 'conta.cobranca.Total'] /
    df_sem_out.loc[outliers_index, 'conta.cobranca.mensal']
)

sns.boxplot(x=df_sem_out['cliente.tempo_servico'])

df_sem_out[outliers_index][['cliente.tempo_servico', 'conta.cobranca.mensal', 'conta.cobranca.Total']]

"""## Removendo outliers"""

df_sem_out[outliers_index]['cliente.tempo_servico']

Q1 = df_sem_out['cliente.tempo_servico'].quantile(.25)
Q3 = df_sem_out['cliente.tempo_servico'].quantile(.75)
IQR = Q3-Q1
limite_inferior = Q1 - 1.5*IQR
limite_superior = Q3 + 1.5*IQR

outliers_index = (df_sem_out['cliente.tempo_servico'] < limite_inferior) | (df_sem_out['cliente.tempo_servico'] > limite_superior)
outliers_index

df_sem_out[outliers_index]

df_sem_out = df_sem_out[~outliers_index]
df_sem_out

sns.boxplot(x=df_sem_out['cliente.tempo_servico'])

df_sem_out.reset_index(drop=True, inplace=True)

df_sem_out

"""# Trabalhando com variáveis categóricas

## Substituindo valores
"""

df_sem_id = df_sem_out.drop('id_cliente', axis=1).copy()
df_sem_id

mapeamento = {
    'nao': 0,
    'sim': 1,
    'masculino': 0,
    'feminino': 1
}

for col in df_sem_id.columns:
    print(f"Coluna: {col}")
    print(df_sem_id[col].unique())
    print("-" * 30)

colunas = ['telefone.servico_telefone', 'Churn', 'cliente.parceiro', 'cliente.dependentes', 'conta.faturamente_eletronico', 'cliente.genero']

df_sem_id[colunas] = df_sem_id[colunas].replace(mapeamento)
df_sem_id

for col in df_sem_id.columns:
    print(f"Coluna: {col}")
    print(df_sem_id[col].unique())
    print("-" * 30)

"""## One Hot Encoder (dummy)"""

s = pd.Series(list('abca'))
s

pd.get_dummies(s, dtype=int)

df_sem_id.info()

df_dummies = pd.get_dummies(df_sem_id, dtype=int).copy()
df_dummies.head()

df_dummies.columns

df_dummies.info()
