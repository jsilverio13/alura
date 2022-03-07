# -*- coding: utf-8 -*-
"""deep-learning-treinando-rede-neural-pytorch.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1R4k99Sz6jawCL3RM6iMIPei0DHhxgWId

# Funções de Perda

O módulo ```nn``` e suas 1001 utilidades, também fornece as implementações das principais funções de perda. Então vamos primeiro importar o ```torch``` e o módulo ```nn``` <br>
"""

import torch
from torch import nn

"""Antes de tudo, vamos conferir qual dispositivo de hardware está disponível para uso."""

if torch.cuda.is_available():
  device = torch.device('cuda')
else:
  device = torch.device('cpu')

print(device)

"""Vamos trabalhar com o dataset de classificação de vinhos.

https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_wine.html

"""

from sklearn import datasets

wine = datasets.load_wine()
data = wine.data
target = wine.target

print(data.shape, target.shape)
print(wine.feature_names, wine.target_names)

"""
Vamos instanciar um MLP com uma camada escondida e uma camada de saída. <br>"""

class WineClassifier(nn.Module):

  def __init__(self, input_size, hidden_size, out_size):
    super(WineClassifier, self).__init__()

    self.hidden  = nn.Linear(input_size, hidden_size)
    self.relu    = nn.ReLU()
    self.out     = nn.Linear(hidden_size, out_size)
    self.softmax = nn.Softmax()

  def forward(self, X):
    
    feature = self.relu(self.hidden(X))
    output  = self.softmax(self.out(feature))

    return output

input_size  = data.shape[1]
hidden_size = 32
out_size    = len(wine.target_names)

net = WineClassifier(input_size, hidden_size, out_size).to(device) #cast na GPU

print(net)

"""## Classificação

O primeiro passo é instanciar a função de perda de sua escolha. Trata-se de um problema de classificação com 3 classes, nesse caso a Cross Entropy é a função recomendada, que no PyTorch recebe o nome de *CrossEntropyLoss*: https://pytorch.org/docs/stable/nn.html#crossentropyloss 

**Assim como a rede, as entradas e os rótulos, a função de perda também deve ser carregada na GPU**

"""

criterion = nn.CrossEntropyLoss().to(device) # cast na GPU

"""Antes de aplicar a função de perda, vamos fazer o cast dos dados para tensores e extrair as predições ```y'``` da rede."""

Xtns = torch.from_numpy(data).float()
Ytns = torch.from_numpy(target)

# Cast na GPU
Xtns = Xtns.to(device)
Ytns = Ytns.to(device)

print(Xtns.dtype, Ytns.dtype)

pred = net(Xtns)

"""Confira as dimensões de ```y``` e ```y'```. Enquanto as predições estão em termos de probabilidades, os rótulos de classificação devem são valores inteiros referentes aos índices das classes."""

print(pred.shape, Ytns.shape)

print(pred[0].data, Ytns[0].data)

"""As funções de perda implementadas no PyTorch esperam o seguinte padrão de chamada:

```python
loss = criterion(prediction, target)
```

Vale lembrar que cada função de perda possui especificidades quanto às dimensões dos seus parâmetros. Para a Cross Entropy:
* prediction: ```(N, C)```
* target: ```(N,)```
"""

loss = criterion(pred, Ytns)
print(loss)

"""## Regressão

Vamos trabalhar com o dataset de Diabetes, cujo objetivo é prever a progressão da diabetes em um paciente.

https://scikit-learn.org/stable/datasets/index.html#diabetes-dataset
"""

from sklearn import datasets

diabetes = datasets.load_diabetes()
data = diabetes.data
target = diabetes.target

print(data.shape, target.shape)

print(data[14])
print(target[14])

"""Implementando o MLP"""

class WineClassifier(nn.Module):

  def __init__(self, input_size, hidden_size, out_size):
    super(WineClassifier, self).__init__()

    self.hidden  = nn.Linear(input_size, hidden_size)
    self.relu    = nn.ReLU()
    self.out     = nn.Linear(hidden_size, out_size)
    self.softmax = nn.Softmax(dim=-1)

  def forward(self, X):
    
    feature = self.relu(self.hidden(X))
    output  = self.softmax(self.out(feature))

    return output

input_size  = data.shape[1]
hidden_size = 32
out_size    = 1  # Progressão da diabetes

net = WineClassifier(input_size, hidden_size, out_size).to(device) #cast na GPU

"""Para solucionar problemas de regressão, as funções de perda correspondentes esperam que ambos o rótulo e a predição tenham **a mesma dimensionalidade**. Não se trata mais de um problema categórico.

Portanto, vamos simular um problema de regressão e aplicar a *MSELoss*<br>
Documentação: https://pytorch.org/docs/stable/nn.html#mseloss
"""

criterion = nn.MSELoss().to(device)

# Cast na GPU
Xtns = torch.from_numpy(data).float().to(device)
Ytns = torch.from_numpy(target).float().to(device)

print(Xtns.shape, Ytns.shape)

pred = net(Xtns)

loss = criterion(pred.squeeze(), Ytns)
print(loss.data)

criterion = nn.L1Loss().to(device)

pred = net(Xtns)

loss = criterion(pred.squeeze(), Ytns)
print(loss.data)

"""## Documentação
Veja a documentação para consultar a lista de todas as funções de perda implementadas no PyTorch: <br>
https://pytorch.org/docs/stable/nn.html#loss-functions

# Otimização

Para entender o processo de otimização, vamos utilizar um dataset de classificação de vinhos. A classificação é feita com base em análises químicas realizadas em **três diferentes cultivos** na mesma região da Itália. 

O carregamento dos dados está descrito na documentação do Scikit-Learn:<br>
https://scikit-learn.org/stable/modules/generated/sklearn.datasets.load_wine.html

Dentre os 13 atributos do dataset, selecionamos 2 para facilitar a visualização dos resultados:
* Teor Alcoólico: índice 0 
* Intensidade da cor: índice 9
"""

from sklearn import datasets
import matplotlib.pyplot as plt

features = [0, 9]

wine = datasets.load_wine()
data = wine.data[:, features]
targets = wine.target

print(wine.feature_names)

plt.scatter(data[:, 0], data[:,1], c=targets, s=15, cmap=plt.cm.brg)
plt.xlabel(wine.feature_names[features[0]])
plt.ylabel(wine.feature_names[features[1]])

"""### Padronização

Um pré-processamento extremamente importante nesse caso é a padronização dos valores de entrada. Como as características variam em intervalos diferentes (cor: [1, 13], álcool: [11, 15]), elas vão exercer diferentes influências sobre o nosso modelo e prejudicar muito a sua convergência. 

* **Ao final dessa aula, sugiro que rode esse script comentando a célula abaixo, e veja o impacto sobre o processo de otimização.**
"""

from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
data = scaler.fit_transform(data)

plt.scatter(data[:, 0], data[:,1], c=targets, s=15, cmap=plt.cm.brg)
plt.xlabel(wine.feature_names[features[0]])
plt.ylabel(wine.feature_names[features[1]])

"""## Instanciando sua rede

Antes de entrar nas nuances da otimização, vamos fazer o que já sabemos: instanciar um MLP de duas camadas neurais, uma escondida e outra de saída.

Lembre-se de definir o dispositivo de hardware (cuda ou cpu) antes de iniciar os trabalhos. 

"""

import torch
from torch import nn

torch.manual_seed(42)

if torch.cuda.is_available():
  device = torch.device('cuda')
else:
  device = torch.device('cpu')

print(device)

input_size  = data.shape[1]
hidden_size = 32
out_size    = len(wine.target_names) # numero de classes 

net = nn.Sequential(
    nn.Linear(input_size, hidden_size),
    nn.ReLU(),
    nn.Linear(hidden_size, out_size),
    nn.Softmax()
)

net = net.to(device)

"""## Visualizando a fronteira de decisão

Para facilitar o entendimento do processo de otimização, vamos utilizar uma função auxiliar para visualizar a fronteira de decisão da nossa rede neural de classificação. Como acabamos de instanciá-la, seus pesos modelam uma função aleatória que não se ajusta adequadamente aos dados, e isso é facilmente visível em duas dimensões.

Adaptada de:<br>
https://github.com/camilalaranjeira/Neural-Lectures/blob/master/XOR_Problem.ipynb
"""

import numpy as np 

def plot_boundary(X, y, model):
  x_min, x_max = X[:, 0].min()-0.1, X[:, 0].max()+0.1
  y_min, y_max = X[:, 1].min()-0.1, X[:, 1].max()+0.1
  
  spacing = min(x_max - x_min, y_max - y_min) / 100
  
  XX, YY = np.meshgrid(np.arange(x_min, x_max, spacing),
                       np.arange(y_min, y_max, spacing))
  
  data = np.hstack((XX.ravel().reshape(-1,1), 
                    YY.ravel().reshape(-1,1)))
  
  # For binary problems
  # db_prob = model(Variable(torch.Tensor(data)).cuda() )
  # clf = np.where(db_prob.cpu().data < 0.5,0,1)
  
  # For multi-class problems
  db_prob = model(torch.Tensor(data).to(device) )
  clf = np.argmax(db_prob.cpu().data.numpy(), axis=-1)
  
  Z = clf.reshape(XX.shape)
  
  plt.contourf(XX, YY, Z, cmap=plt.cm.brg, alpha=0.5)
  plt.scatter(X[:,0], X[:,1], c=y, edgecolors='k', s=25, cmap=plt.cm.brg)

plot_boundary(data, targets, net)

"""## Pacote ```torch.optim```

Mãos a obra! Vamos agora otimizar a nossa rede usando os algoritmos mais tradicionais da área. Para isso, a biblioteca ```torch.optim``` nos será bem útil, pois ela implementa os principais algoritmos de otimização de redes neurais.

O primeiro passo é instanciar o otimizador. De acordo com o pacote ```optim```, basta chamar o otimizador escolhido, passando como parâmetro:
* Os parâmetros da rede que será otimizada (```net.parameters()```)
* A taxa de aprendizado

A depender do otimizador, pode ser necessário alimentar outros parâmetros, mas esses dois são obrigatórios!

Vamos utilizar a **Descida do Gradiente** que vimos na aula teórica, implementada pelo otimizador **```optim.SGD```** (*Stochastic Gradient Descent*).
"""

from torch import optim

# Função de Perda
criterion = nn.CrossEntropyLoss().to(device)

# Otimizador: Descida do Gradiente
# Stochastic Gradient Descent
optimizer = optim.SGD(net.parameters(), lr=1e-3)

"""### Hiperparâmetros

* Valores definidos antes do início do aprendizado
* Devem ser ajustados para cada tarefa específica

A taxa de aprendizado não é o primeiro hiperparâmetro que temos contato. Ao definir a arquitetura da sua rede (quantos neurônios e quantas camadas) você também teve que escolher um valor adequado. **Essa escolha pode ser empírica, mas em geral deve ser experimental**, na busca pelo melhor conjunto de hiperparâmetros para solucionar o seu problema! 

* 🐼 Empírica ([Abordagem do Panda](https://www.coursera.org/lecture/deep-neural-network/hyperparameters-tuning-in-practice-pandas-vs-caviar-DHNcc)): O programador investe seus esforços em um único modelo (um bebê panda), e altera os hiperparâmetros com base na sua experiência e nas observações
* 💻 Experimental: Múltiplos modelos são gerados simultaneamente, com diferentes combinações de hiperparâmetros. Dentre eles, é escolhido o que apresentar melhor performance.

## Cast do dados

Os dados carregados do Scikit-Learn são retornados como ```ndarrays```, por isso precisamos convertê-los para tensores e carregá-los na GPU (caso disponível) antes de alimentar o modelo neural.
"""

X = torch.FloatTensor(data).to(device) # GPU
Y = torch.LongTensor(targets).to(device)

"""## Treinando um modelo

O treinamento consiste nas etapas que vimos na aula teórica. Aqui vamos relacionar cada etapa ao seu código correspondente.

* Forward
  * Alimentar os dados para a rede <br>
  ```pred = net(X)```
  * Calcular a função de custo <br>
  ```loss = criterion(pred, y)```
* Backpropagation
  * Calcular o gradiente <br>
  ```loss.backward()```
  * Atualizar os pesos <br>
  ```optimizer.step()```


A princípio não vamos falar de procedimentos adequados de treinamento. Vamos apenas realizar as etapas de treinamento e ver o que acontece.
"""

for i in range(200):
  # Forward 
  pred = net(X)
  loss = criterion(pred, Y)

  # Backward
  loss.backward()
  optimizer.step()

  if i % 10 == 0:
    plt.figure()
    plot_boundary(data, targets, net)

"""## Treinamento: Conclusão

Como a otimização de uma rede neural é um processo iterativo, os dados de treino devem ser alimentados múltiplas vezes para o modelo. **Cada iteração onde o conjunto de treino inteiro foi utilizado no processo de treinamento é chamado de <font color='color'>época</font>.** Veremos essas nomenclaturas em detalhes nas aulas futuras.
"""



"""# Carregamento de Dados

Objetivos dessa aula:
* Carregar dados reais do Pytorch
* Implementar o fluxo de treinamento completo de uma rede

Mas calma que essa ainda não é a linha de chegada. Ainda precisaremos falar do fluxo de validação.

## Hiperparâmetros

Agora que a brincadeira está ficando séria, que tal uma sugestão de como organizar o seu código? Para facilitar o entendimento e manutenção do código, mantenha sempre no início os seguintes elementos:
* imports de pacotes
* configuração de hiperparâmetros
* definição do hardware padrão utilizado

Nessa aula vamos trabalhar com dados reais, então **vamos precisar de GPU!** Então não se esqueça de mudar as configurações desse ambiente do colab. <br>
Sugiro rodar esse mesmo código sem GPU em outro momento, só pra sentir o gostinho de como a GPU facilitou o uso de redes neurais.
"""

import torch
from torch import nn, optim

from torchvision import datasets
from torchvision import transforms 

from torch.utils.data import DataLoader

import matplotlib.pyplot as plt
import numpy as np
import time

args = {
    'batch_size': 5,
    'num_workers': 4,
    'num_classes': 10,
    'lr': 1e-4,
    'weight_decay': 5e-4,
    'num_epochs': 30
}

if torch.cuda.is_available():
  args['device'] = torch.device('cuda')
else:
  args['device'] = torch.device('cpu')

print(args['device'])

"""## Datasets

O PyTorch possui dois pacotes que trazem datasets prontos para uso.

* Torchtext: https://torchtext.readthedocs.io/en/latest/datasets.html
* Torchvision: https://pytorch.org/docs/stable/torchvision/datasets.html

Como os nomes indicam, são datasets de textos (text) e imagens (vision), duas aplicações onde redes neurais são muito bem sucedidas.

Para aplicações com textos e outros tipos de séries temporais, o carregamento de dados possui nuances que dificultam o entendimento, portanto vamos concentrar no carregamento de imagens.

### Torchvision datasets

Para trabalhar com datasets do pacote torchvision, basta
* Importar o pacote
``` python 
from torchvision import datasets 
```
* Carregar o dataset do seu interesse (ex: MNIST)
``` python 
data = datasets.MNIST(root, train=True, transform=None, target_transform=None, download=False)
```

Documentação: https://pytorch.org/docs/stable/torchvision/datasets.html

### Torchvision transforms

Não vamos entrar em detalhes sobre transformações de imagens, mas para qualquer dataset é necessário transformá-lo em tensor para que possamos alimentar uma rede em pytorch. Isso pode ser feito no carregamento dos dados, basta:

* Importar o pacote transforms
``` python 
from torchvision import transforms 
```
* preencher o parâmetro ```tranform``` do dataset com a função que converte para tensor.
``` python 
transforms.ToTensor() 
```

Pronto! Quando seu dado for carregado, ele passará pela transformação indicada no parâmetro ```tranform```, nesse caso, convertendo o dado para um tensor.

Documentação: https://pytorch.org/docs/stable/torchvision/transforms.html

"""

train_set = datasets.MNIST('./', 
                           train=True, 
                           transform=transforms.ToTensor(),
                           download=True)

test_set = datasets.MNIST('./', 
                           train=False, 
                           transform=transforms.ToTensor(),
                           download=False)

print('Amostras de treino: ' + str(len(train_set)) + '\nAmostras de Teste:' + str(len(test_set)))

"""Cada dataset possui uma implementação específica internamente no pytorch. Verifique o ```type``` da variável que recebeu os dados e veja que se refere a uma classe específica do dataset.

No entanto, o item de qualquer dataset **sempre será uma tupla ```(dado, rótulo)```**. 
"""

print(type(train_set))
print(type(train_set[0]))

"""Podemos então iterar no dataset para observar algumas amostras e seus rótulos."""

for i in range(3):
  dado, rotulo = train_set[i]

  plt.figure()
  plt.imshow(dado[0])
  plt.title('Rotulo: '+ str(rotulo))

"""Temos um total de 70 mil amostras, mas elas **ainda não estão carregadas na memória** (isso seria bastante custoso). A vantagem da classe ```Dataset``` do Pytorch é que as amostras só são carregadas quando necessário.

Sugestão: experimente trocar a transformação do Dataset para
```python
transforms.RandomCrop(12)
```
Essa função realiza um recorte aleatório de ```12 x 12``` (pixels) na imagem. Ao carregar a mesma amostra múltiplas vezes, um novo recorte será feito. 
"""

crop_set = datasets.MNIST('./', 
                           train=False, 
                           transform=transforms.RandomCrop(12),
                           download=False)

# Tuple (dado, rótulo)
for i in range(3):
  dado, rotulo = crop_set[0]
  
  plt.figure()
  plt.imshow(dado)
  plt.title('Rótulo: '+ str(rotulo))

"""Em resumo, cada vez que indexamos um item do dataset, as seguintes operações são realizadas:
* Amostra lida do arquivo e carregada como uma tupla ```(dado, rótulo)```
* As transformações são aplicadas

## Dataloader

Essa aqui é uma das principais razões do Pytorch ser o pacote preferido de muitos profissionais. O Dataloader gerencia muito bem o carregamento de dados para o treinamento de redes neurais, trazendo as funções: 

* Separação dos dados em batches
* Embaralhando os dados
* Carregando batches em paralelo utilizando threads

O uso de threads no carregamento minimiza períodos ociosos de processamento, visto que a leitura de dados em arquivo é um grande gargalo de tempo.

As três funcionalidades que acabamos de conhecer são controladas pelos parâmetros da chamada do DataLoader.
```python
loader = DataLoader(dataset, batch_size=4, shuffle=True, num_workers=4)
```
"""

train_loader = DataLoader(train_set, 
                          batch_size=args['batch_size'], 
                          shuffle=True, 
                          num_workers=args['num_workers'])

test_loader = DataLoader(test_set, 
                          batch_size=args['batch_size'], 
                          shuffle=True, 
                          num_workers=args['num_workers'])

"""O objeto retornado é um **iterador**, podendo ser utilizado para iterar em loops mas não suportando indexação."""

for batch in train_loader:
  
  dado, rotulo = batch
  print(dado.size(), rotulo.size())

  plt.imshow(dado[0][0])
  plt.title('Rotulo: '+ str(rotulo[0]) )
  break

"""## Implementando o MLP


**Lembrete**: Multi-Layer Perceptrons trabalham somente com dados unidimensionais (vetores). Sendo a imagem com dimensionalidade ```(1, 28, 28)```, precisamos linearizá-la antes de alimentar a rede. Isso implica que o a entrada da rede terá ```input_size = 28 x 28 x 1 = 784```
"""

class MLP(nn.Module):

  def __init__(self, input_size, hidden_size, out_size):
    super(MLP, self).__init__()

    self.features  = nn.Sequential(
                      nn.Linear(input_size, hidden_size),
                      nn.ReLU(),
                      nn.Linear(hidden_size, hidden_size),
                      nn.ReLU()
                    )
    self.out     = nn.Linear(hidden_size, out_size)
    self.softmax = nn.Softmax()

  def forward(self, X):
    
    X = X.view(X.size(0), -1)

    feature = self.features(X)
    output  = self.softmax(self.out(feature))

    return output

input_size  = 28 * 28
hidden_size = 128
out_size    = 10 #classes

torch.manual_seed(42)
net = MLP(input_size, hidden_size, out_size).to(args['device']) #cast na GPU

"""## Definindo loss e otimizador"""

criterion = nn.CrossEntropyLoss().to(args['device'])
optimizer = optim.Adam(net.parameters(), lr=args['lr'], weight_decay=args['weight_decay'])



"""# Fluxo de Treinamento

Agora vamos aplicar o conhecimento que acabamos de aprender!

Relembrando o passo a passo do fluxo de treinamento:
* Iterar nas épocas
* Iterar nos batches
* Cast dos dados no dispositivo de hardware
* Forward na rede e cálculo da loss
* Cálculo do gradiente e atualização dos pesos

Para acompanhar a convergência do seu modelo (e garantir que tudo foi feito certinho), ao final de cada época podemos imprimir a média e o desvio padrão das perdas de cada iteração.
"""

for epoch in range(args['num_epochs']):
  start = time.time()

  epoch_loss = []
  for batch in train_loader:
    
    dado, rotulo = batch

    # Cast na GPU
    dado   = dado.to(args['device'])
    rotulo = rotulo.to(args['device'])

    # Forward 
    pred = net(dado)
    loss = criterion(pred, rotulo)
    epoch_loss.append(loss.cpu().data)

    # Backward
    loss.backward()
    optimizer.step()

  epoch_loss = np.asarray(epoch_loss)
  end = time.time()

  print("Epoca %d, Loss: %.4f +\- %.4f, Tempo: %.2f" % (epoch, epoch_loss.mean(), epoch_loss.std(), end-start) )

"""### Interpretando a qualidade do modelo

Apesar da loss ser o critério utilizado na otimização do modelo, seu valor é pouco interpretável por seres humanos.

* *A loss está melhorando, mas como saber se meu modelo está bom mesmo?*

Podemos calcular uma métrica mais interpretável. No caso da classificação, temos a acurácia como métrica mais simples de avaliação. Esse valor será usado exclusivamente para visualizar a qualidade do modelo, não interferindo no treinamento da rede. 

Na célula anterior utilizaremos a biblioteca Scikit-Learn para calcular a acurácia, para isso basta
* Armazenar os rótulos de cada iteração
* Calcular a predição a partir da saída da rede
* Utilizar a função do sklearn para cálculo da acurácia
```python
metrics.accuracy_score(rotulos, ypreds)
```

Documentação: https://scikit-learn.org/stable/modules/generated/sklearn.metrics.accuracy_score.html
"""



"""# Carregamento de Dados

Objetivos dessa aula:
* Carregar um dataset customizado
* Implementar o fluxo de treinamento **e validação** completo de uma rede

## Hiperparâmetros

Vamos manter a organização do último script :)

* imports de pacotes
* configuração de hiperparâmetros
* definição do hardware padrão utilizado

E bora de GPU de novo!
"""

# Commented out IPython magic to ensure Python compatibility.
import torch
from torch import nn
from torch import optim

from torch.utils.data import Dataset
from torch.utils.data import DataLoader

from sklearn import metrics
from sklearn.preprocessing import StandardScaler

import pandas as pd
import numpy as np
import time
import os


import matplotlib.pyplot as plt
# %matplotlib inline

# Configurando hiperparâmetros.
args = {
    'epoch_num': 200,     # Número de épocas.
    'lr': 5e-5,           # Taxa de aprendizado.
    'weight_decay': 5e-4, # Penalidade L2 (Regularização).
    'num_workers': 3,     # Número de threads do dataloader.
    'batch_size': 20,     # Tamanho do batch.
}

if torch.cuda.is_available():
    args['device'] = torch.device('cuda')
else:
    args['device'] = torch.device('cpu')

print(args['device'])

"""## Dataset 

Dataset de aplicativos para aluguel de bicicletas (*Bike Sharing Dataset*). <br>
* Dadas algumas informações como velocidade do vento, estação do ano, etc., quantas bicicletas serão alugadas na próxima hora?

Esse é um problema de **Regressão**, onde precisamos estimar uma variável dependente em um espaço contínuo (alugueis de bikes) a partir de um conjunto de variáveis independentes (as condições no momento).

### Baixando o dataset

Fonte: https://archive.ics.uci.edu/ml/datasets/Bike+Sharing+Dataset
"""

! wget https://archive.ics.uci.edu/ml/machine-learning-databases/00275/Bike-Sharing-Dataset.zip
! unzip Bike-Sharing-Dataset.zip

"""### Visualizando os dados"""

df = pd.read_csv('hour.csv')
print(len(df))
df.head()

"""### Tratamento de dados

**Variáveis Categóricas** <br>
Como descrito na página do dataset, apenas as variáveis numéricas estão normalizadas. No caso das categóricas (como dia da semana e estação do ano), cada elemento contém o índice da categoria.

Existem várias formas de lidar com variáveis categóricas em uma regressão, mas para não desviar o foco da nossa aula manteremos os valores originais das variáveis categóricas.

**Separação em treino e teste**<br>

Para treinar e validar o nosso modelo, precisamos de dois conjuntos de dados (treino e teste). Para isso, utilizaremos a função ```torch.randperm``` para amostrar aleatoriamente um percentual dos dados, separando-os para validação.

Documentação: https://pytorch.org/docs/stable/torch.html#torch.randperm
"""

# Train/Test split
torch.manual_seed(1)
indices = torch.randperm(len(df)).tolist()

train_size = int(0.8*len(df))
df_train = df.iloc[indices[:train_size]]
df_test  = df.iloc[indices[train_size:]]

print(len(df_train), len(df_test))
display(df_test.head())

df_train.to_csv('bike_train.csv',index=False)
df_test.to_csv('bike_test.csv',index=False)
!ls

"""### Classe Dataset

O pacote ```torch.util.data``` possui a classe abstrata ```Dataset```. Ela permite que você implemente o seu próprio dataset reescrevendo os métodos:

* ```__init__(self)```: Define a lista de amostras do seu dataset
* ```__getitem__(self, idx)```: Carrega uma amostra, aplica as devidas transformações e retorna uma **tupla ```(dado, rótulo)```**.
* ```__len__(self)```: Retorna a quantidade de amostras do dataset

Tutorial completo do PyTorch: https://pytorch.org/tutorials/beginner/data_loading_tutorial.html

"""

class Bicicletinha(Dataset):
  def __init__(self, csv_path, scaler_feat=None, scaler_label=None):
  
    self.dados = pd.read_csv(csv_path).to_numpy()
    
  def __getitem__(self, idx):
    
    sample = self.dados[idx][2:14]
    label  = self.dados[idx][-1:]
    
    # converte para tensor
    sample = torch.from_numpy(sample.astype(np.float32))
    label  = torch.from_numpy(label.astype(np.float32))
    
    return sample, label
    
  def __len__(self):
    return len(self.dados)

dataset = Bicicletinha('bike_train.csv')
dado, rotulo = dataset[0]
print(rotulo)
print(dado)

"""### Construindo conjuntos de treino e teste"""

train_set = Bicicletinha('bike_train.csv')
test_set  = Bicicletinha('bike_test.csv')

print('Tamanho do treino: ' + str(len(train_set)) + ' amostras')
print('Tamanho do teste: ' + str(len(test_set)) + ' amostras')

"""## Dataloader

"""

# Criando dataloader
train_loader = DataLoader(train_set,
                          args['batch_size'],
                          num_workers=args['num_workers'],
                          shuffle=True)
test_loader = DataLoader(test_set,
                         args['batch_size'],
                         num_workers=args['num_workers'],
                         shuffle=False)

"""O objeto retornado é um **iterador**, podendo ser utilizado para iterar em loops mas não suportando indexação."""

for batch in test_loader:
  
  dado, rotulo = batch
  print('## Dimensionalidade do batch ##')
  print(dado.size(), rotulo.size())
  
  break

"""## Implementando o MLP

Essa parte aqui você já tira de letra! Minha sugestão é construir um modelo com:

* **Duas camadas escondidas**. Lembre-se de alternar as camadas com ativações não-lineares. 
* Uma camada de saída (com qual ativação?)
"""

class MLP(nn.Module):
  
  def __init__(self, input_size, hidden_size, out_size):
    super(MLP, self).__init__()
    
    self.features = nn.Sequential(
          nn.Linear(input_size, hidden_size),
          nn.ReLU(),
          nn.Linear(hidden_size, hidden_size),
          nn.ReLU(),
    )
    
    self.classifier = nn.Sequential(
        nn.Linear(hidden_size, out_size),
        nn.ReLU(),
    )

  def forward(self, X):
    
    hidden = self.features(X)
    output = self.classifier(hidden)
    
    return output

input_size  = train_set[0][0].size(0)
hidden_size = 128
out_size    = 1

net = MLP(input_size, hidden_size, out_size).to(args['device'])
print(net)

"""## Definindo loss e otimizador

Se lembra quais as funções de perda adequadas para um problema de regressão?
"""

criterion = nn.L1Loss().to(args['device'])

optimizer = optim.Adam(net.parameters(), lr=args['lr'], weight_decay=args['weight_decay'])



"""# Fluxo de Treinamento & Validação

## Treinamento

Relembrando o passo a passo do fluxo de treinamento:
* Iterar nas épocas
* Iterar nos batches
* Cast dos dados no dispositivo de hardware
* Forward na rede e cálculo da loss
* Cálculo do gradiente e atualização dos pesos

Esse conjunto de passos é responsável pelo processo iterativo de otimização de uma rede. **A validação** por outro lado, é apenas a aplicação da rede em dados nunca antes visto para estimar a qualidade do modelo no mundo real.

## Validação

Para essa etapa, o PyTorch oferece dois artifícios:
* ```model.eval()```: Impacta no *forward* da rede, informando as camadas caso seu comportamento mude entre fluxos (ex: dropout).
* ```with torch.no_grad()```: Gerenciador de contexto que desabilita o cálculo e armazenamento de gradientes (economia de tempo e memória). Todo o código de validação deve ser executado dentro desse contexto.

Exemplo de código para validação

```python
net.eval()
with torch.no_grad():
  for batch in test_loader:
      # Código de validação
```

Existe o equivalente ao ```model.eval()``` para explicitar que a sua rede deve estar em modo de treino, é o ```model.train()```. Apesar de ser o padrão dos modelos, é boa prática definir também o modo de treinamento.
"""

def train(train_loader, net, epoch):

  # Training mode
  net.train()
  
  start = time.time()
  
  epoch_loss  = []
  for batch in train_loader:
    
    dado, rotulo = batch
    
    # Cast do dado na GPU
    dado = dado.to(args['device'])
    rotulo = rotulo.to(args['device'])
    
    # Forward
    ypred = net(dado)
    loss = criterion(ypred, rotulo)
    epoch_loss.append(loss.cpu().data)
    
    # Backpropagation
    loss.backward()
    optimizer.step()
   
  epoch_loss = np.asarray(epoch_loss)
  
  end = time.time()
  print('#################### Train ####################')
  print('Epoch %d, Loss: %.4f +/- %.4f, Time: %.2f' % (epoch, epoch_loss.mean(), epoch_loss.std(), end-start))
  
  return epoch_loss.mean()

def validate(test_loader, net, epoch):

  # Evaluation mode
  net.eval()
  
  start = time.time()
  
  epoch_loss  = []
  
  with torch.no_grad(): 
    for batch in test_loader:

      dado, rotulo = batch

      # Cast do dado na GPU
      dado = dado.to(args['device'])
      rotulo = rotulo.to(args['device'])

      # Forward
      ypred = net(dado)
      loss = criterion(ypred, rotulo)
      epoch_loss.append(loss.cpu().data)

  epoch_loss = np.asarray(epoch_loss)
  
  end = time.time()
  print('********** Validate **********')
  print('Epoch %d, Loss: %.4f +/- %.4f, Time: %.2f\n' % (epoch, epoch_loss.mean(), epoch_loss.std(), end-start))
  
  return epoch_loss.mean()

train_losses, test_losses = [], []
for epoch in range(args['epoch_num']):
  
  # Train
  train_losses.append(train(train_loader, net, epoch))
  
  # Validate
  test_losses.append(validate(test_loader, net, epoch))

Xtest = torch.stack([tup[0] for tup in test_set])
Xtest = Xtest.to(args['device'])

ytest = torch.stack([tup[1] for tup in test_set])
ypred = net(Xtest).cpu().data

data = torch.cat((ytest, ypred), axis=1)

df_results = pd.DataFrame(data, columns=['ypred', 'ytest'])
df_results.head(20)

"""# Gráfico de convergência"""

plt.figure(figsize=(20, 9))
plt.plot(train_losses, label='Train')
plt.plot(test_losses, label='Test', linewidth=3, alpha=0.5)
plt.xlabel('Epochs', fontsize=16)
plt.ylabel('Loss', fontsize=16)
plt.title('Convergence', fontsize=16)
plt.legend()
plt.show()