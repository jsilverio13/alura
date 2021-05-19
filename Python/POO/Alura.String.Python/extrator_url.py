import re


class ExtratorURL:
    def __init__(self, url):
        self.url = self.sanatiza_url(url)
        self.valida_url()

    def sanatiza_url(self, url):
        if type(url) == str:
            return url.strip()

    def valida_url(self):
        if not self.url:
            raise ValueError("A URL está vazia")

        padrao_url = re.compile('(http(s)?://)?(www.)?bytebank.com(.br)?/cambio')
        match = padrao_url.match(self.url)

        if not match:
            raise ValueError("A URL não é valida")

    def get_url_base(self):
        indice_interrogacao = self.url.find('?')
        url_base = self.url[:indice_interrogacao]
        return url_base

    def get_url_parametros(self):
        indice_interrogacao = self.url.find('?')
        url_parametros = self.url[indice_interrogacao + 1:]
        return url_parametros

    def get_valor_parametros(self, parametro_busca):
        indice_parametro = self.get_url_parametros().find(parametro_busca)
        indice_valor = indice_parametro + len(parametro_busca) + 1
        indice_comercial = self.get_url_parametros().find('&', indice_valor)

        if indice_comercial == -1:
            valor = self.get_url_parametros()[indice_valor:]
        else:
            valor = self.get_url_parametros()[indice_valor:indice_comercial]

        return valor

    def __len__(self):
        return len(self.url)

    def __str__(self):
        return f'{self.url} \nParametros: {self.get_url_parametros()} \nURL Base: {self.get_url_base()}'

    def __eq__(self, other):
        return self.url == other.url


url = "https://bytebank.com/cambio?moedaDestino=dolar&quantidade=100&moedaOrigem=real"
extrator_url = ExtratorURL(url)
extrator_url_2 = ExtratorURL(url)
print(f'O tamanho da URL é: {len(extrator_url)}')
print(extrator_url)

print(extrator_url == extrator_url_2)

valor_quantidade = extrator_url.get_valor_parametros("moedaDestino")
print(valor_quantidade)
