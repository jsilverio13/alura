# -*- coding: utf-8 -*-
"""data-science-primeiros-passos

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1V87Dpxk-By9Fum0Ub6dhrHlBoi9892hT
"""

from google.colab import drive
drive.mount('/content/drive')

PATH = "/content/drive/MyDrive/Curso/Alura/data-science-primeiros-passos"

import pandas as pd

"""# Analisando as notas gerais"""

notas = pd.read_csv(f"{PATH}/ratings.csv")

notas.head(5)

notas.shape

notas.columns = ["usuarioId", "filmeId", "nota", "momento"]

notas.head(5)

notas['nota'].unique()

notas['nota'].value_counts()

notas['nota'].mean()

notas.nota.plot(kind='hist')

print(f'Média {notas.nota.mean()}')
print(f'Mediana {notas.nota.median()}')

import seaborn as sns

sns.boxplot(notas.nota)

"""# Analisando Filmes

#
"""

filmes = pd.read_csv(f'{PATH}/movies.csv')
filmes.columns = ['filmeId', 'titulo', 'generos']
filmes.head()

notas.query("filmeId==1").nota.mean()

notas.query("filmeId==2").nota.mean()

medias_por_filme = notas.groupby("filmeId").nota.mean()
medias_por_filme

medias_por_filme.plot(kind='hist')

sns.boxplot(medias_por_filme)

medias_por_filme.describe()

sns.distplot(medias_por_filme, bins=10)

import matplotlib.pyplot as plt

plt.hist(medias_por_filme)
plt.title("Histograma das médias dos filmes")

sns.boxplot(y=medias_por_filme)

import matplotlib.pyplot as plt

plt.figure(figsize=(5,8))

sns.boxplot(y=medias_por_filme)

tmdb = pd.read_csv(f"{PATH}/tmdb_5000_movies.csv")
tmdb.head()

tmdb.original_language.value_counts()

contagem_de_lingua = tmdb.original_language.value_counts().to_frame().reset_index()
contagem_de_lingua.columns = ['original_language', 'total']
contagem_de_lingua.head()

sns.barplot(data = contagem_de_lingua, x = 'original_language', y='total')

sns.catplot(x = 'original_language', data=tmdb, kind='count')

plt.pie(contagem_de_lingua['total'], labels = contagem_de_lingua['original_language'])

total_por_lingua = tmdb['original_language'].value_counts()
total_geral = total_por_lingua.sum()
total_de_ingles = total_por_lingua.loc['en']
total_do_resto = total_geral - total_de_ingles
print(total_de_ingles, total_do_resto)

dados = {
    'lingua': ['ingles', 'outros'],
    'total' : [total_de_ingles, total_do_resto]
}

dados = pd.DataFrame(dados)
dados.head()

sns.barplot(x='lingua', y ='total', data=dados)

plt.pie(dados['total'], labels = dados['lingua'])

total_por_lingua_resto = tmdb.query("original_language!='en'").original_language.value_counts()
total_por_lingua_resto.head()

filmes_sem_lingua_original_em_ingles = tmdb.query("original_language != 'en'")

sns.catplot(
    x = "original_language", 
    data = filmes_sem_lingua_original_em_ingles, 
    kind="count",
    aspect=2, 
    order=total_por_lingua_resto.index,
    palette ='GnBu_d')

filmes.head(2)

notas_do_toy_story = notas.query("filmeId==1")
notas_do_jumanji = notas.query("filmeId==2")
print(len(notas_do_toy_story), len(notas_do_jumanji))

print("Nota média do Toy Story %.2f" % notas_do_toy_story.nota.mean())
print("Nota média do Jumanji %.2f" % notas_do_jumanji.nota.mean())

print("Mediana do Toy Story %.2f" % notas_do_toy_story.nota.median())
print("Mediana do Jumanji %.2f" % notas_do_jumanji.nota.median())

import numpy as np

np.array([2.5] * 10).mean()

filme1 = np.append(np.array([2.5] * 10), np.array([3.5] * 10))

filme2 = np.append(np.array([5] * 10), np.array([1] * 10))

print(filme1.mean(), filme2.mean())

print(np.median(filme1), np.median(filme2))

plt.hist(filme1)
plt.hist(filme2)

plt.boxplot([filme1,filme2])

plt.boxplot([notas_do_toy_story.nota, notas_do_jumanji.nota])

sns.boxplot(x = "filmeId", y = "nota", data = notas.query("filmeId in (1,2)"))

sns.boxplot(x = "filmeId", y = "nota", data = notas.query("filmeId in (1,2,3,4,5)"))

print("Desvio padrão do Jumanji %.2f" % notas_do_jumanji.nota.std(), "Desvio padrão do Toy Story %.2f" % notas_do_toy_story.nota.std())

print(np.mean(filme1), np.mean(filme2))
print(np.std(filme1), np.std(filme2))
print(np.median(filme1), np.median(filme2))
