#*****************************************
# AULA 1
#*****************************************

GET _search
{
  "query": {
    "match_all": {}
  }
}

POST catalogo/_doc/
{
    "nome": "João Silva",
    "interesses": ["futebol", "música", "literatura"],
    "cidade": "São Paulo",
    "formação": "Letras",
    "estado": "SP",
    "país": "Brasil"
}

GET catalogo/_count

POST catalogo/_doc/1
{
    "nome": "João Silva",
    "interesses": ["futebol", "música", "literatura"],
    "cidade": "São Paulo",
    "formação": "Letras",
    "estado": "SP",
    "país": "Brasil"
}

GET catalogo/_doc/1

GET catalogo/_search

GET catalogo/_search/?q=futebol