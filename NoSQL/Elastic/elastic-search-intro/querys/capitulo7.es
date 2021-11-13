#*****************************************
# AULA 7
#*****************************************

GET indice_com_sinonimo_2/_analyze
{
    "analyzer": "portuguese",
    "text": "esporte"
}

PUT /catalogo_v3
{
    "settings": {
        "index": {
            "number_of_shards": 3,
            "number_of_replicas": 0
        },
        "analysis": {
            "filter": {
                "portuguese_stop": {
                    "type": "stop",
                    "stopwords": "_portuguese_"
                },
                "portuguese_stemmer": {
                    "type": "stemmer",
                    "language": "light_portuguese"
                },
                "filtro_de_sinonimos": {
                    "type": "synonym",
                    "synonyms": [
                        "futebol => futebol,society",
                        "society => society,futebol",
                        "volei,voleibol,volleyball",
                        "esport => esport,futebol,society,volei,basquet",
                        "exat => exat,matematic,fisic,computaca",
                        "arte => arte,pintur,teatr,music,cinem"
                    ]
                }
            },
            "analyzer": {
                "sinonimos": {
                    "tokenizer": "standard",
                    "filter": [
                        "lowercase",
                        "portuguese_stop",
                        "portuguese_stemmer",
                        "filtro_de_sinonimos"
                    ]
                }
            }
        }
    },
    "mappings": {
        "properties": {
            "cidade": {
                "type": "text",
                "index": true,
                "analyzer": "portuguese"
            },
            "estado": {
                "type": "text"
            },
            "formação": {
                "type": "text",
                "index": true,
                "analyzer": "portuguese"
            },
            "interesses": {
                "type": "text",
                "index": true,
                "analyzer": "portuguese",
                "search_analyzer": "sinonimos"
            },
            "nome": {
                "type": "text",
                "fields": {
                    "original": {
                        "type": "keyword",
                        "index": true
                    }
                },
                "index": true,
                "analyzer": "portuguese"
            },
            "país": {
                "type": "text",
                "index": true,
                "analyzer": "portuguese"
            }
        }
    }
}

