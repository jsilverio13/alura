#*****************************************
# AULA 2
#*****************************************

HEAD catalogo/_doc/1

HEAD catalogo/_doc/100

GET catalogo/_doc/100

PUT catalogo/_doc/50

PUT /catalogo/_doc/50
{
    "nome": "Marcelo Ricardo de Oliveira",
    "interesses": [
        "cinema",
        "música",
        "programação"
    ],
    "cidade": "São Paulo",
    "formação": "Tecnologia da Informação",
    "estado": "SP",
    "país": "Brasil"
}

GET catalogo/_doc/50

GET catalogo/_doc/1

DELETE catalogo/_doc/1

POST catalogo/_update/50
{
    "doc": {
        "nome": "Marcelo R. Oliveira"
    }
}

GET catalogo/_doc/50