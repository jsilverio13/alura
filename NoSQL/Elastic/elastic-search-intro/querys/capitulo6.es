#*****************************************
# AULA 6
#*****************************************

PUT /indice_com_sinonimo
{
    "settings": {
        "index": {
            "number_of_shards": 3,
            "number_of_replicas": 0
        },
        "analysis": {
            "filter": {
                "filtro_de_sinonimos": {
                    "type": "synonym",
                    "synonyms": [
                        "esporte,futebol,society,futeba,pelada"
                    ]
                }
            },
            "analyzer": {
                "sinonimos": {
                    "tokenizer": "standard",
                    "filter": [
                        "lowercase",
                        "filtro_de_sinonimos"
                    ]
                }
            }
        }
    }
}

GET /indice_com_sinonimo/_analyze
{
    "analyzer": "sinonimos",
    "text": "eu gosto de jogar society"
}

DELETE /indice_com_sinonimo

PUT /indice_com_sinonimo
{
    "settings": {
        "index": {
            "number_of_shards": 3,
            "number_of_replicas": 0
        },
        "analysis": {
            "filter": {
                "filtro_de_sinonimos": {
                    "type": "synonym",
                    "synonyms": [
                        "esporte,futebol,basquete,society,volei"
                    ]
                }
            },
            "analyzer": {
                "sinonimos": {
                    "tokenizer": "standard",
                    "filter": [
                        "lowercase",
                        "filtro_de_sinonimos"
                    ]
                }
            }
        }
    }
}

GET /indice_com_sinonimo/_analyze
{
    "analyzer": "sinonimos",
    "text": "eu gosto de praticar esporte"
}

GET /indice_com_sinonimo/_analyze
{
    "analyzer": "sinonimos",
    "text": "Praticantes de esporte"
}

PUT /indice_com_sinonimo_2
{
    "settings": {
        "index": {
            "number_of_shards": 3,
            "number_of_replicas": 0
        },
        "analysis": {
            "filter": {
                "filtro_de_sinonimos": {
                    "type": "synonym",
                    "synonyms": [
                        "futebol => futebol,society",
                        "society => society,futebol",
                        "esporte => esporte,futebol,society,volei,basquete"
                    ]
                }
            },
            "analyzer": {
                "sinonimos": {
                    "tokenizer": "standard",
                    "filter": [
                        "lowercase",
                        "filtro_de_sinonimos"
                    ]
                }
            }
        }
    }
}

GET /indice_com_sinonimo_2/_analyze
{
    "analyzer": "sinonimos",
    "text": "esportes"
}

DELETE indice_com_sinonimo_2

PUT /indice_com_sinonimo_2
{
    "settings": {
        "index": {
            "number_of_shards": 3,
            "number_of_replicas": 0
        },
        "analysis": {
            "filter": {
                "filtro_de_sinonimos": {
                    "type": "synonym",
                    "synonyms": [
                        "futebol => futebol,society",
                        "society => society,futebol",
                        "esporte => esporte,futebol,society,volei,basquete",
                        "esportes => esporte,futebol,society,volei,basquete"
                    ]
                }
            },
            "analyzer": {
                "sinonimos": {
                    "tokenizer": "standard",
                    "filter": [
                        "lowercase",
                        "filtro_de_sinonimos"
                    ]
                }
            }
        }
    }
}

