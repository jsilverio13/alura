# -*- coding: utf-8 -*-
"""data-science-series-temporais.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1r80zF9eImQxdruplr63scOsAuMfdoJXz

# **Alucar - Analisando as vendas**
"""

import pandas as pd

alucar = pd.read_csv('alucar.csv')

alucar.head()

print('Quantidade de linhas e colunas: ', alucar.shape)

print('Quantidade de dados nulos:', alucar.isna().sum().sum())

alucar.dtypes

alucar['mes'] = pd.to_datetime(alucar['mes'])
alucar.dtypes

# Commented out IPython magic to ensure Python compatibility.
import seaborn as sns
# %matplotlib inline
from matplotlib import pyplot as plt

print(sns.__version__)

x = 'mes'
y = 'vendas'
data = alucar
sns.lineplot(x=x,y=y,data=data)

sns.set_palette('Accent')
sns.set_style('darkgrid')
x = 'mes'
y = 'vendas'
data = alucar
ax = sns.lineplot(x=x,y=y,data=data)
ax.figure.set_size_inches(12,6)
ax.set_title('Vendas alucar de 2017 e 2018', loc='left', fontsize=18)
ax.set_xlabel('Tempo', fontsize=14)
ax.set_ylabel('Vendas', fontsize=14)
ax = ax

alucar.head()

alucar['aumento'] = alucar['vendas'].diff()
alucar.head()

sns.set_palette('Accent')
sns.set_style('darkgrid')
x = 'mes'
y = 'aumento'
data = alucar
ax = sns.lineplot(x=x,y=y,data=data)
ax.figure.set_size_inches(12,6)
ax.set_title('Aumento das vendas alucar de 2017 e 2018', loc='left', fontsize=18)
ax.set_xlabel('Tempo', fontsize=14)
ax.set_ylabel('Aumento R$', fontsize=14)
ax = ax

def plotar(titulo, labelx, labely, x,y, data):
  sns.set_palette('Accent')
  sns.set_style('darkgrid')
  data = data
  ax = sns.lineplot(x=x,y=y,data=data)
  ax.figure.set_size_inches(12,6)
  ax.set_title(titulo, loc='left', fontsize=18)
  ax.set_xlabel(labelx, fontsize=14)
  ax.set_ylabel(labely, fontsize=14)
  ax = ax

plotar('Aumento das vendas da Alucar de 2017 e 2018', 'Tempo', 'Aumento', 'mes', 'aumento', alucar)

alucar['aceleracao'] = alucar['aumento'].diff()
alucar.head()

plotar('Aceleração das vendas da Alucar de 2017 e 2018', 'Tempo', 'Aceleração', 'mes', 'aceleracao', alucar)

plt.figure(figsize=(16,12))
ax = plt.subplot(3,1,1)
ax.set_title('Análise da alucar de 2017 e 2018', fontsize=18,loc='left')
sns.lineplot(x='mes', y='vendas', data=alucar)
plt.subplot(3,1,2)
sns.lineplot(x='mes', y='vendas', data=alucar)
plt.subplot(3,1,3)
sns.lineplot(x='mes', y='aceleracao', data=alucar)

def plot_comparacao(x, y1, y2, y3, dataset, titulo):
    plt.figure(figsize=(16,12))
    ax = plt.subplot(3,1,1)
    ax.set_title(titulo,fontsize=18, loc='left')
    sns.lineplot(x=x, y=y1, data=dataset)
    plt.subplot(3,1,2)
    sns.lineplot(x=x, y=y2, data=dataset)
    plt.subplot(3,1,3)
    sns.lineplot(x=x, y=y3, data=dataset)
    ax=ax

plot_comparacao('mes', 'vendas', 'aumento', 'aceleracao',
                alucar, 'Análise das vendas da Alucar de 2017 e 2018')

from pandas.plotting import autocorrelation_plot

autocorrelation_plot(alucar['vendas'])

ax = plt.figure(figsize=(12,6))

ax = plt.figure(figsize=(12,6))
ax.suptitle('Correlação das Vendas', fontsize=18, x=0.26, y=0.95) 
autocorrelation_plot(alucar['vendas'])
ax=ax

ax = plt.figure(figsize=(12,6))
ax.suptitle('Correlação das Aumento', fontsize=18, x=0.26, y=0.95) 
autocorrelation_plot(alucar['aumento'][1:])
ax=ax

ax = plt.figure(figsize=(12,6))
ax.suptitle('Correlação das Aceleração', fontsize=18, x=0.26, y=0.95) 
autocorrelation_plot(alucar['aceleracao'][2:])
ax=ax

"""#**Alucar - Analisando assinantes da newsletter**"""

assinantes = pd.read_csv('newsletter_alucar.csv') 
assinantes.head()

assinantes.dtypes

print('Quantidade de linhas e colunas', assinantes.shape)
print('Quantidade de dados nulos', assinantes.isna().sum().sum())

assinantes['mes'] = pd.to_datetime(assinantes['mes'])

assinantes.dtypes

assinantes['aumento']= assinantes ['assinantes'].diff()
assinantes['aceleracao']= assinantes ['aumento'].diff()
assinantes.head()

plot_comparacao('mes', 'assinantes', 'aumento', 'aceleracao', assinantes, 'Análise de assinantes da newsletter')

"""# **Chocolura - analisando as vendas**"""

chocolura = pd. read_csv('chocolura.csv')

chocolura.head()

chocolura.dtypes

chocolura['mes'] = pd.to_datetime(chocolura['mes'])
chocolura.dtypes

print ('Quantidade de linhas:', chocolura.shape)
print ('Quantidade de dados nulos:', chocolura.isna().sum().sum())

chocolura['aumento']= chocolura ['vendas'].diff()
chocolura['aceleracao']= chocolura ['aumento'].diff()
chocolura.head()

plot_comparacao('mes', 'vendas', 'aumento', 'aceleracao', chocolura, 'Análise de vendas da Chocolura de 2017 a 2018')



"""#**Chocolura - Vendas diárias (Outubro e Novembro)**"""

vendas_por_dia = pd. read_csv('vendas_por_dia.csv')
vendas_por_dia.head()

print ('Quantidade de linhas:',vendas_por_dia.shape)
print ('Quantidade de dados nulos:', vendas_por_dia.isna().sum().sum())

vendas_por_dia.dtypes

vendas_por_dia['dia'] = pd.to_datetime(vendas_por_dia['dia'])
vendas_por_dia.dtypes

vendas_por_dia['aumento']= vendas_por_dia['vendas'].diff()
vendas_por_dia['aceleracao']= vendas_por_dia ['aumento'].diff()

plot_comparacao('dia', 'vendas', 'aumento', 'aceleracao', vendas_por_dia, 'Análise de vendas de Outubro e Novembro - Chocolura')

"""## **Analisando a sacionalidade**"""

vendas_por_dia['dia_da_semana'] = vendas_por_dia ['dia'].dt.day_name()

vendas_por_dia.head()

vendas_por_dia['dia_da_semana'].unique()

dias_traduzidos = {'Monday': 'Segunda', 'Tuesday' : 'Terça', 'Wednesday':'Quarta', 'Thursday':'Quinta', 'Friday':'Sexta', 'Saturday':'Sábado', 'Sunday':'Domingo'}

vendas_por_dia['dia_da_semana'] = vendas_por_dia['dia_da_semana'].map(dias_traduzidos)
vendas_por_dia.head(14)

vendas_agrupadas = vendas_por_dia.groupby('dia_da_semana')['vendas', 'aumento', 'aceleracao'].mean().round()

vendas_agrupadas.head()

vendas_agrupadas.head(7)

"""**Correlação das Vendas diárias**"""

ax = plt.figure(figsize=(12,6))
ax.suptitle('Correlação das vendas diárias', fontsize=18, x=0.3, y=0.95)
autocorrelation_plot(vendas_por_dia['vendas'])
ax = ax

ax = plt.figure(figsize=(12,6))
ax.suptitle('Correlação do aumento das vendas diárias', fontsize=18, x=0.3, y=0.95)
autocorrelation_plot(vendas_por_dia['aumento'][1:])
ax = ax

ax = plt.figure(figsize=(12,6))
ax.suptitle('Correlação da aceleração das vendas diárias', fontsize=18, x=0.3, y=0.95)
autocorrelation_plot(vendas_por_dia['aceleracao'][2:])
ax = ax

"""#**Cafelura - Análise de vendas**"""

cafelura = pd.read_csv('cafelura.csv')
cafelura.head()

cafelura.dtypes

cafelura['mes'] = pd.to_datetime(cafelura['mes'])
cafelura.dtypes

print(f'Quantidade de linhas e colunas {cafelura.shape}')
print(f'Quantidade de dados nulos {cafelura.isna().sum().sum()}')

plotar('Vendas da Cafelura de 2017 e 2018', 'Tempo', 'Vendas', 'mes', 'vendas', cafelura)

quantidade_de_dias_fds = pd.read_csv('dias_final_de_semana.csv')

quantidade_de_dias_fds.head()

quantidade_de_dias_fds['quantidade_de_dias'].values

cafelura['vendas_normalizadas'] = cafelura['vendas'] / quantidade_de_dias_fds['quantidade_de_dias'].values
cafelura.head()

cafelura.dtypes

plotar('Vendas Normalizadas da Cafelura de 2017 e 2018', 'Tempo', 'Vendas Normalizadas', 'mes', 'vendas_normalizadas', cafelura)

plt.figure(figsize=(16,12))
ax =plt.subplot(2,1,1)
ax.set_title('Vendas Cafelura 2017 e 2018', fontsize=18)
sns.lineplot(x='mes',y='vendas',data=cafelura)
ax =plt.subplot(2,1,2)
ax.set_title('Vendas Normalizadas Cafelura 2017 e 2018', fontsize=18)
sns.lineplot(x='mes',y='vendas_normalizadas',data=cafelura)
ax = ax

"""# **Statsmodels**"""

from statsmodels.tsa.seasonal import seasonal_decompose

resultado = seasonal_decompose(chocolura['vendas'],freq=3)
ax = resultado.plot()

observacao = resultado.observed
tendencia = resultado.trend
sazonalidade = resultado.seasonal
ruido = resultado.resid

data = ({
       'observacao':observacao,
       'tendencia':tendencia, 
       'sazonalidade':sazonalidade,
       'ruido':ruido
})
resultado = pd.DataFrame(data)
resultado.head

plot_comparacao(resultado.index, 'observacao', 'tendencia', 'sazonalidade', resultado, 'Exemplo de Statsmodels')

plot_comparacao(resultado.index, 'observacao', 'tendencia', 'ruido', resultado, 'Exemplo de Statsmodels')

"""# **Alucel - Análise de vendas**"""

alucel = pd.read_csv('alucel.csv')
alucel.head()

alucel['dia'] = pd.to_datetime(alucel['dia'])
alucel.dtypes

print('Quantidade de linhas e colunas:', alucel.shape)
print('Quantidade de dados nulos:', alucel.isna().sum().sum())

alucel ['aumento'] = alucel ['vendas'].diff()
alucel ['aceleracao'] = alucel ['aumento'].diff()

plot_comparacao('dia', 'vendas', 'aumento', 'aceleracao', alucel, 'Análise de vendas da Alucel de Outubro e Novembro de 2018')

"""**Média Móvel**"""

alucel['media_movel'] = alucel['vendas'].rolling(7).mean()
alucel.head()

plotar('Análise de vendas com média móvel de 7 dias', 'Tempo', 'Média Móvel', 'dia', 'media_movel', alucel)

alucel['media_movel_21'] = alucel['vendas'].rolling(21).mean()

plotar('Análise de vendas com média móvel de 21 dias', 'Tempo', 'Média Móvel', 'dia', 'media_movel_21', alucel)

plot_comparacao('dia', 'vendas', 'media_movel', 'media_movel_21', alucel, 'Comparando as médias móveis')

