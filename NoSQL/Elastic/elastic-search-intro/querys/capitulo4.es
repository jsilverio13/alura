#*****************************************
# AULA 4
#*****************************************

GET catalogo/_mapping

PUT /catalogo/_doc/1
{
    "nome": "Patrick von Steppat",
    "interesses": [
        "computação",
        "culinária",
        "cinema"
    ],
    "cidade": "Rio de Janeiro",
    "formação": "Gastronomia",
    "estado": "RJ",
    "país": "Brasil"
}

PUT /catalogo/_doc/1
{
    "nome": "Patrick von Steppat 2",
    "interesses": [
        "computação",
        "culinária",
        "cinema"
    ],
    "cidade": "Rio de Janeiro",
    "formação": "Gastronomia",
    "estado": "RJ",
    "país": "Brasil",
    "nascimento": "1984-10-03T12:00:00Z"
}

GET catalogo/_doc/1

GET catalogo/_mapping

