# -*- coding: utf-8 -*-
"""data-visualization-seaborn.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/16xnbOupUKub6_Bgc1hYHp5JPqbwiutNv

# **Importando base de dados**
"""

import pandas as pd

pd.read_csv('tips.csv')

dados = pd.read_csv('tips.csv')
dados

dados.head()

dados.value_counts()

"""# **Tradução**"""

dados.columns

renomear  ={
    'total_bill': 'valor_da_conta',
    'tip':'gorjeta',
    'dessert':'sobremesa',
    'day': 'dia_da_semana',
    'time':'hora_do_dia',
    'size': 'total_depessoas'
}

type(dados)

gorjetas = dados.rename(columns = renomear)

gorjetas.head()

gorjetas.sobremesa.unique()

sim_nao = {
    'No': 'Não', 'Yes': 'Sim'
}

gorjetas.sobremesa.map(sim_nao)

gorjetas.head()

gorjetas.sobremesa = gorjetas.sobremesa.map(sim_nao)

gorjetas.head()

gorjetas.dia_da_semana.unique()

dias = {
    'Sun': 'Domingo', 'Sat':'Sábado', 'Thur':'Quinta', 'Fri':'Sexta'
}

gorjetas.dia_da_semana.map(dias)

gorjetas.dia_da_semana = gorjetas.dia_da_semana.map(dias)

gorjetas.head()

gorjetas.hora_do_dia.unique()

hora = {
    'Dinner': 'Jantar', 'Lunch': 'Almoço'
}

gorjetas.hora_do_dia.map(hora)

gorjetas.hora_do_dia = gorjetas.hora_do_dia.map(hora)

gorjetas.head()

"""# **Importando o Searborn**"""

!pip install seaborn==0.9.0

import seaborn as sns

!pip show seaborn

"""# **Análise 1 - Valor da conta e gorjeta**"""

gorjetas.columns

sns.scatterplot(x='valor_da_conta', y='gorjeta', data=gorjetas )

valor_gorjeta = sns.scatterplot(x='valor_da_conta', y='gorjeta', data=gorjetas )

"""**Visualmente, o valor da gorjeta aumenta conforme aumenta o valor da conta**"""

print(f'A base de dados contém {gorjetas.shape[0]} registros')

print(f'Registros não nulos')
gorjetas.count()

"""## **Criando o campo porcentagem**"""

gorjetas.head()

gorjetas['porcentagem'] = gorjetas['gorjeta'] / gorjetas['valor_da_conta']

gorjetas.porcentagem = gorjetas.porcentagem.round(2)
gorjetas.head()

porcentagem_conta = sns.scatterplot(x='valor_da_conta',y='porcentagem', data=gorjetas)

"""**Visualmente o valor da conta não é proporcional ao da gorjeta**"""

porcentagem_conta_linha = sns.relplot(x='valor_da_conta', y='porcentagem', data=gorjetas, kind='line')

sns.lmplot(x='valor_da_conta', y='porcentagem', data=gorjetas)

"""# **Análise 2 - Sobremesa**"""

gorjetas.head()

gorjetas[gorjetas.sobremesa == 'Sim'].describe()

gorjetas[gorjetas.sobremesa == 'Não'].describe()

sns.catplot(x='sobremesa', y='gorjeta',data=gorjetas)

sns.relplot(x='valor_da_conta',y='gorjeta',hue='sobremesa', data=gorjetas)

sns.relplot(x='valor_da_conta',y='gorjeta',hue='sobremesa', data=gorjetas, col='sobremesa')

sns.lmplot(x='valor_da_conta',y='porcentagem',col='sobremesa',hue='sobremesa',data=gorjetas)

sns.relplot(x='valor_da_conta',y='gorjeta',col='sobremesa',hue='sobremesa',data=gorjetas, kind='line')

"""**Visualmente existe uma diferença no valor da gorjeta em quem pediu sobremesa e não pediram sobremesa**

## **Teste de hipótese**

**H<sup>null</sup>**
 **A distribuição da taxa da gorjeta é a mesma nos dois grupos**

**H<sup>alt</sup>**
**A distribuição da taxa da gorjeta não é a mesma nos dois grupos**
"""

from scipy.stats import ranksums

gorjetas.query("sobremesa == 'Sim'").porcentagem

sobremesa = gorjetas.query("sobremesa == 'Sim'").porcentagem

sobremesa = gorjetas.query("sobremesa == 'Sim'").porcentagem
sem_sobremesa = gorjetas.query("sobremesa == 'Não'").porcentagem

ranksums(sobremesa, sem_sobremesa)

r = ranksums(sobremesa, sem_sobremesa)
print(f'O valor do p-value é {r.pvalue}')

"""**H<sup>null</sup>**
 **A distribuição da taxa da gorjeta é a mesma nos dois grupos**

# **Análise 3 - Dia da semana**
"""

gorjetas.head()

gorjetas.dia_da_semana.unique()

x = 'dia_da_semana'
y = 'valor_da_conta'
sns.catplot(x=x, y=y, data=gorjetas)

x = 'valor_da_conta'
y= 'gorjeta'
hue = 'dia_da_semana'
sns.relplot(x=x, y=y, data=gorjetas, hue=hue)

x = 'valor_da_conta'
y= 'porcentagem'
hue = 'dia_da_semana'
sns.relplot(x=x, y=y, data=gorjetas, hue=hue)

x = 'valor_da_conta'
y = 'gorjeta'
hue = 'dia_da_semana'
col = 'dia_da_semana'
sns.relplot(x=x, y=y, data=gorjetas, hue=hue, col=col)

x = 'valor_da_conta'
y = 'porcentagem'
hue = 'dia_da_semana'
col = 'dia_da_semana'
sns.relplot(x=x, y=y, data=gorjetas, hue=hue, col=col)

x = 'valor_da_conta'
y = 'porcentagem'
hue = 'dia_da_semana'
col = 'dia_da_semana'
sns.lmplot(x=x, y=y, data=gorjetas, hue=hue, col=col)

gorjetas.gorjeta.mean()

media_geral_gorjetas = gorjetas.gorjeta.mean()

print(f'A média geral das gorjetas e de {media_geral_gorjetas}')

gorjetas.groupby(['dia_da_semana']).mean()

gorjetas.groupby(['dia_da_semana']).mean(['valor_da_conta', 'gorjeta','porcentagem'])

print('Frequência dos dias')
gorjetas.dia_da_semana.value_counts()

"""## **Teste de Hipótese**

**H<sup>null</sup>**
 **A distribuição do valor da conta é igual no sábado e no domigo**

**H<sup>alt</sup>**
 **A distribuição do valor da conta não é igual no sábado e no domigo**
"""

valor_conta_domingo = gorjetas.query("dia_da_semana == 'Domingo'").valor_da_conta

valor_conta_sabado = gorjetas.query("dia_da_semana == 'Sábado'").valor_da_conta

ranksums(valor_conta_domingo, valor_conta_sabado)

r2 = ranksums(valor_conta_domingo, valor_conta_sabado)
print(f'O valor do p-value é {r2.pvalue}')

"""**H<sup>null</sup>**
 **A distribuição do valor da conta é igual no sábado e no domigo**

#**Análise 4 - Hora do dia**
"""

gorjetas.head()

gorjetas.hora_do_dia.unique()

x = 'hora_do_dia'
y = 'valor_da_conta'
sns.catplot(x=x, y=y, data=gorjetas)

x = 'hora_do_dia'
y = 'valor_da_conta'
kind =  'swarm'
sns.catplot(x=x, y=y, data=gorjetas, kind=kind)

x = 'hora_do_dia'
y = 'valor_da_conta'

sns.violinplot(x=x, y=y, data=gorjetas)

x = 'hora_do_dia'
y = 'valor_da_conta'

sns.boxplot(x=x, y=y, data=gorjetas)

almoco = gorjetas.query("hora_do_dia == 'Almoço'").valor_da_conta

sns.distplot(almoco)

sns.distplot(almoco, kde=False)

jantar = gorjetas.query("hora_do_dia == 'Jantar'").valor_da_conta

sns.distplot(jantar)

sns.distplot(jantar, kde=False)

gorjetas.groupby(['hora_do_dia']).mean()

gorjetas.groupby(['hora_do_dia']).mean()[['valor_da_conta', 'gorjeta', 'porcentagem']]

"""## **Teste de hipótese**

**H<sup>null</sup>**
 **A distribuição do valor da conta é igual no jantar e no almoço**

 **H<sup>alt</sup>**
 **A distribuição do valor da conta não é igual no jantar e no almoço**
"""

r2 = ranksums(jantar, almoco)
print(f'O valor do p-value é de {r2.pvalue}')

"""**H<sup>alt</sup>**
 **A distribuição do valor da conta não é igual no jantar e no almoço**

## **Teste de hipótese 2**

**H<sup>null</sup>**
 **A distribuição da taxa da gorjeta é igual no jantar e no almoço**

 **H<sup>alt</sup>**
 **A distribuição da taxa da gorjeta não é igual no jantar e no almoço**
"""

porcentagem_almoco = gorjetas.query("hora_do_dia == 'Almoço'").porcentagem

porcentagem_jantar = gorjetas.query("hora_do_dia == 'Jantar'").porcentagem

ranksums(porcentagem_almoco, porcentagem_jantar)

r3 = ranksums(porcentagem_almoco, porcentagem_jantar)
print(f'O valor do p-value é de {r3.pvalue}')

"""**H<sup>null</sup>**
 **A distribuição da taxa da gorjeta é igual no jantar e no almoço**
"""