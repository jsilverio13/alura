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
    "interesses": [
        "futebol",
        "música",
        "literatura"
    ],
    "cidade": "São Paulo",
    "formação": "Letras",
    "estado": "SP",
    "país": "Brasil"
}

GET catalogo/_count

POST catalogo/_doc/1
{
    "nome": "João Silva",
    "interesses": [
        "futebol",
        "música",
        "literatura"
    ],
    "cidade": "São Paulo",
    "formação": "Letras",
    "estado": "SP",
    "país": "Brasil"
}

GET catalogo/_doc/1

GET catalogo/_search

GET catalogo/_search/?q=futebol

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

#*****************************************
# AULA 3
#*****************************************

GET catalogo/_search/?q=futebol

GET catalogo/_search/?q=estado:SP

GET catalogo/_search/?q=estado:futebol

GET catalogo/_search/?q=futebol&size=10&from=10

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

#*****************************************
# AULA 5
#*****************************************

GET catalogo/_search?q=musica

GET catalogo/_search?q=música

GET catalogo/_analyze
{
  "text": "Eu nasci há 10 mil (sim, isso mesmo, 10 mil) anos atrás"
}

GET catalogo/_analyze
{
  "analyzer": "simple", 
  "text": "Eu nasci há 10 mil (sim, isso mesmo, 10 mil) anos atrás"
}

GET catalogo/_analyze
{
  "analyzer": "whitespace", 
  "text": "Eu nasci há 10 mil (sim, isso mesmo, 10 mil) anos atrás"
}

GET catalogo/_analyze
{
  "analyzer": "portuguese", 
  "text": "Eu nasci há 10 mil (sim, isso mesmo, 10 mil) anos atrás"
}

PUT /catalogo_v2
{
  "settings": {
    "index": {
      "number_of_shards": 3,
      "number_of_replicas": 0
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
        "analyzer": "portuguese"
      },
      "nome": {
        "type": "text",
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

POST /catalogo_v2/_doc/1
{
    "nome": "João Silva",
    "interesses": ["futebol", "música", "literatura"],
    "cidade": "São Paulo",
    "formação": "Letras",
    "estado": "SP",
    "país": "Brasil"
}

GET catalogo/_search?q=musica

GET catalogo_v2/_search?q=MÚSICAS

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
          "tokenizer":  "standard",
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
          "tokenizer":  "standard",
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
  "text":"eu gosto de praticar esporte"
}

GET /indice_com_sinonimo/_analyze
{
  "analyzer": "sinonimos",
  "text":"Praticantes de esporte"
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
          "tokenizer":  "standard",
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
  "text":"esportes"
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
          "tokenizer":  "standard",
          "filter": [
            "lowercase",
            "filtro_de_sinonimos"
          ]
        }
      }
    }
  }
}

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

#*****************************************
# AULA 8
#*****************************************

PUT /pessoas
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
        "fields": {
          "original": {
            "type": "keyword",
            "index": true
          }
        },
        "index": true,
        "analyzer": "portuguese"
      },
      "estado": {
		"type": "keyword",
		"index": true
      },
      "formação": {
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
        "fields": {
          "original": {
			"type": "keyword",
			"index": true
          }
        },
        "index": true,
        "analyzer": "portuguese"
      }
    }
  }
}








POST /pessoas/_bulk
{"index": {}}
{"nome": "Abdalla Yussef Tauil Neto", "cidade": "São José do Rio Claro", "formação": "Letras", "estado": "MT", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Abdullah Hassan Akram Fayad", "cidade": "Senhora da Gloria", "formação": "Física", "estado": "MG", "país": "Brasil", "interesses": ["basquete"] }
{"index": {}}
{"nome": "Abdy Augusto Silva", "cidade": "Tamboril do Piaui", "formação": "Artes Cênicas", "estado": "PI", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Abel dos Santos Beserra", "cidade": "Arapongas", "formação": "Artes Cênicas", "estado": "PR", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Abelardo Fukasawa Borges", "cidade": "Bação", "formação": "Estatística", "estado": "MG", "país": "Brasil", "interesses": ["society"] }
{"index": {}}
{"nome": "Abhner Matheus Londero Rossini", "cidade": "Teixeira", "formação": "Estatística", "estado": "PB", "país": "Brasil", "interesses": ["artes","pintura"] }
{"index": {}}
{"nome": "Abidan Henrique da Silva", "cidade": "Bom Jesus", "formação": "Artes Cênicas", "estado": "SC", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Abigail Lanuza de Novais Moreira", "cidade": "Monte Alegre", "formação": "Estatística", "estado": "SC", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Abilio Augusto Jose Forni", "cidade": "Olho D'Água Do Casado", "formação": "História", "estado": "AL", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Abner Alves de Oliveira", "cidade": "Altinopolis", "formação": "Letras", "estado": "SP", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Abner Carnizello Souza", "cidade": "Santana dos Montes", "formação": "Ciências Sociais", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Abner Ezequiel Rosendo", "cidade": "Alto Sucuriu", "formação": "História", "estado": "MS", "país": "Brasil", "interesses": ["society","volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Abner Gustavo Chuquimia Sanizo", "cidade": "Quatro Barras", "formação": "Artes Cênicas", "estado": "PR", "país": "Brasil", "interesses": ["matemática","física"] }
{"index": {}}
{"nome": "Abner Lucas Sacramento da Costa", "cidade": "Santana do Aracuai", "formação": "Música", "estado": "MG", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Abner Luiz Dias da Cruz", "cidade": "Jequitai", "formação": "Letras", "estado": "MG", "país": "Brasil", "interesses": ["matemática","física"] }
{"index": {}}
{"nome": "Abner Martins de Siqueira", "cidade": "Boquira", "formação": "Letras", "estado": "BA", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Abner Moriel de Souza", "cidade": "Ermidinha", "formação": "Ciência da Computação", "estado": "MG", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Abner Oliveira Bispo", "cidade": "Camela", "formação": "Estatística", "estado": "PE", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Abraao Rafael Soares dos Santos", "cidade": "Km Null", "formação": "Estatística", "estado": "PR", "país": "Brasil", "interesses": ["pintura","teatro"] }
{"index": {}}
{"nome": "Abrahan Lincoln Dorea Silva", "cidade": "Tapiratiba", "formação": "Música", "estado": "SP", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Abrahao Elias Neto", "cidade": "Cascalho Rico", "formação": "Economia", "estado": "MG", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Acacia Costa Fernandes", "cidade": "Vicosa", "formação": "Ciência da Computação", "estado": "AL", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Acacio Dorta de Souza Neto", "cidade": "Mimoso", "formação": "Economia", "estado": "MT", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Acacio Marques Farias", "cidade": "Engenho Velho", "formação": "Física", "estado": "MT", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Acassio Silva Guimaraes", "cidade": "Colonia Esperanca", "formação": "Letras", "estado": "PR", "país": "Brasil", "interesses": ["física"] }
{"index": {}}
{"nome": "Acsa Caroline Alves Magrini", "cidade": "Araguapaz", "formação": "Letras", "estado": "GO", "país": "Brasil", "interesses": ["física","computação","artes"] }
{"index": {}}
{"nome": "Acsa Suellen de Moraes", "cidade": "Guara", "formação": "Educação Física", "estado": "PR", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Adailson Reis de Jesus", "cidade": "Iolopolis", "formação": "Letras", "estado": "PR", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Adailton Oliveira da Silva", "cidade": "Olho D'agua Das Cunhas", "formação": "Matemática", "estado": "MA", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Adaiton Moreira de Oliveira Filho", "cidade": "Itauna do Sul", "formação": "Letras", "estado": "PR", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Adalberto Bellomo Pereira", "cidade": "Marechal Bormann", "formação": "Artes Cênicas", "estado": "SC", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Adalberto Borges de Sousa", "cidade": "São João do Oriente", "formação": "Ciências Sociais", "estado": "MG", "país": "Brasil", "interesses": ["teatro","música"] }
{"index": {}}
{"nome": "Adalberto Cordeiro Furtado Junior", "cidade": "Cambuquira", "formação": "Física", "estado": "PA", "país": "Brasil", "interesses": ["futebol"] }
{"index": {}}
{"nome": "Adauto Gomes Juarez", "cidade": "Peri Mirim", "formação": "Física", "estado": "MA", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Adauto Henrique Estephanini Bignardi", "cidade": "Lagoa do Juvenal", "formação": "Música", "estado": "CE", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Adawana Laudino Muniz", "cidade": "Ilha de Santana", "formação": "Economia", "estado": "AP", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Adeildo Santos de Jesus", "cidade": "Itapanhacanga", "formação": "Física", "estado": "PR", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Adeilton Dean Marques Valois", "cidade": "Morrinhos Novos", "formação": "Ciências Sociais", "estado": "CE", "país": "Brasil", "interesses": ["volei"] }
{"index": {}}
{"nome": "Adelia Suzana da Cunha Melo", "cidade": "Trindade", "formação": "Educação Física", "estado": "PR", "país": "Brasil", "interesses": ["física","computação"] }
{"index": {}}
{"nome": "Adeline Valerio Ronquim", "cidade": "Rio Bonito", "formação": "Matemática", "estado": "SC", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Ademir Figueiredo de Paula", "cidade": "Guararema", "formação": "História", "estado": "PR", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Ademir Souto Silva", "cidade": "Capão Comprido", "formação": "Física", "estado": "RS", "país": "Brasil", "interesses": ["society","volei"] }
{"index": {}}
{"nome": "Aderlan de Souza Lima", "cidade": "Guara", "formação": "Matemática", "estado": "DF", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Adha Nirvana Cabral Aranha", "cidade": "Bodoquena", "formação": "Música", "estado": "MS", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Adhonis Emanuel Braga Lima", "cidade": "Vargem", "formação": "Ciência da Computação", "estado": "SC", "país": "Brasil", "interesses": ["volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Adia Cristina Carvalho Ferreira", "cidade": "Cerro Largo", "formação": "Letras", "estado": "RS", "país": "Brasil", "interesses": ["volleyball"] }
{"index": {}}
{"nome": "Adib Francisco Marques Pinto", "cidade": "Vicosa", "formação": "História", "estado": "MG", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Adilson Aderito da Silva Filho", "cidade": "Monsenhor Hipolito", "formação": "Ciência da Computação", "estado": "PI", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Adilson Cordeiro Silva", "cidade": "Pires Belo", "formação": "Artes Cênicas", "estado": "GO", "país": "Brasil", "interesses": ["música"] }
{"index": {}}
{"nome": "Adilson Tomaz da Silva", "cidade": "São Goncalo do Gurgueia", "formação": "Ciência da Computação", "estado": "PI", "país": "Brasil", "interesses": ["futebol"] }
{"index": {}}
{"nome": "Adilson Torres Gregorio de Souza", "cidade": "Tabauna", "formação": "Estatística", "estado": "MG", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Barbara Aguilar Hatala", "cidade": "Matos Costa", "formação": "Estatística", "estado": "SC", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Barbara Aline Bernardino", "cidade": "São Domingos do Araguaiá", "formação": "Educação Física", "estado": "PA", "país": "Brasil", "interesses": ["volei"] }
{"index": {}}
{"nome": "Barbara Almeida", "cidade": "Presidente Medici", "formação": "Artes Cênicas", "estado": "RO", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Barbara Alves Badaro", "cidade": "Manjeiro", "formação": "Letras", "estado": "PA", "país": "Brasil", "interesses": ["society"] }
{"index": {}}
{"nome": "Barbara Alves de Deus", "cidade": "Vacaria", "formação": "Educação Física", "estado": "RS", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Barbara Aparecida Klafke Zambelli", "cidade": "Cajapio", "formação": "Artes Cênicas", "estado": "MA", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Barbara Arcanjo Campos", "cidade": "Barreiro das Frutas", "formação": "Economia", "estado": "PR", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Barbara Artese Dominguito", "cidade": "Atilio Vivacqua", "formação": "História", "estado": "ES", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Barbara Assis Novak", "cidade": "Fortaleza", "formação": "Letras", "estado": "CE", "país": "Brasil", "interesses": ["física","computação"] }
{"index": {}}
{"nome": "Barbara Augusta Borges Pereira", "cidade": "Pedro Versiani", "formação": "Educação Física", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Barbara Ayumi Peixoto Aoto", "cidade": "Serra das Araras", "formação": "Economia", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Barbara Bacellar Rodrigues de Godoy", "cidade": "São Domingos", "formação": "Matemática", "estado": "SE", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Barbara Barbosa Leite Yadoya", "cidade": "Novo Barreiro", "formação": "Educação Física", "estado": "RS", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Barbara Barboza Lino", "cidade": "Calixto", "formação": "Estatística", "estado": "GO", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Barbara Barrachi Ferreira dos Santos", "cidade": "Ribeirão", "formação": "Letras", "estado": "PE", "país": "Brasil", "interesses": ["volei"] }
{"index": {}}
{"nome": "Barbara Barragan", "cidade": "Liberdade", "formação": "História", "estado": "MG", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Barbara Barreto Nunes", "cidade": "Vila Muriqui", "formação": "Matemática", "estado": "RJ", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Barbara Beluti Andre E Silva", "cidade": "Fernandes Belo", "formação": "Artes Cênicas", "estado": "PA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Barbara Bianchi Rolim", "cidade": "Aral Moreira", "formação": "Ciência da Computação", "estado": "MS", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Barbara Bischain", "cidade": "Lavrinha", "formação": "Letras", "estado": "PR", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Barbara Bozzoli Destro", "cidade": "Apoti", "formação": "História", "estado": "PE", "país": "Brasil", "interesses": ["matemática","física"] }
{"index": {}}
{"nome": "Barbara Brandini Souza", "cidade": "Sacramento", "formação": "Física", "estado": "CE", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Barbara Bressan de Souza", "cidade": "Godofredo Viana", "formação": "Educação Física", "estado": "MA", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Barbara Brito Albuquerque", "cidade": "Vau-açu", "formação": "Letras", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Barbara Buccelli Colonno", "cidade": "Conceição do Lago-açu", "formação": "Ciências Sociais", "estado": "MA", "país": "Brasil", "interesses": ["basquete","matemática","física"] }
{"index": {}}
{"nome": "Barbara Bueno Barbosa", "cidade": "Ze Doca", "formação": "Ciência da Computação", "estado": "MA", "país": "Brasil", "interesses": ["basquete"] }
{"index": {}}
{"nome": "Barbara Camara Aragon", "cidade": "Dias D Avila", "formação": "Economia", "estado": "BA", "país": "Brasil", "interesses": ["pintura","teatro"] }
{"index": {}}
{"nome": "Barbara Camargo Netto", "cidade": "Banabuiú", "formação": "Música", "estado": "CE", "país": "Brasil", "interesses": ["society","volei"] }
{"index": {}}
{"nome": "Barbara Canto Estevam", "cidade": "Lapinha", "formação": "Economia", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Barbara Caon", "cidade": "Oriente", "formação": "Física", "estado": "SP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Barbara Carine Fernandes", "cidade": "Cubas", "formação": "Ciências Sociais", "estado": "MG", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Barbara Carraretto Russe", "cidade": "Mirante da Serra", "formação": "Ciências Sociais", "estado": "RO", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Barbara Castelano Santos", "cidade": "Sussuanha", "formação": "História", "estado": "CE", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Barbara Chiarella Fernandes", "cidade": "Ponto dos Volantes", "formação": "Matemática", "estado": "MG", "país": "Brasil", "interesses": ["society","volei"] }
{"index": {}}
{"nome": "Barbara Chiaretti da Costa", "cidade": "Pirapitingui", "formação": "Ciências Sociais", "estado": "SP", "país": "Brasil", "interesses": ["física","computação","artes"] }
{"index": {}}
{"nome": "Barbara Christina Vieira Jorge", "cidade": "Antonio dos Santos", "formação": "História", "estado": "MG", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Barbara Civalsci de Brito", "cidade": "Tarauacá", "formação": "Educação Física", "estado": "AC", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Barbara Cordeiro", "cidade": "Costeira", "formação": "Estatística", "estado": "PR", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Barbara Correia dos Santos Santana", "cidade": "Trairi", "formação": "Artes Cênicas", "estado": "CE", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Barbara Cristina Vieira Rocha", "cidade": "Jacipora", "formação": "Letras", "estado": "SP", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "Barbara Cristine Bonfim", "cidade": "Balbinos", "formação": "Educação Física", "estado": "SP", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Barbara da Silva Morais", "cidade": "Borba", "formação": "Artes Cênicas", "estado": "AM", "país": "Brasil", "interesses": ["voleibol","volleyball"] }
{"index": {}}
{"nome": "Barbara da Silva Paschoal", "cidade": "São Miguel do Guapore", "formação": "Economia", "estado": "RO", "país": "Brasil", "interesses": ["física","computação","artes"] }
{"index": {}}
{"nome": "Barbara David dos Santos", "cidade": "Ernestina", "formação": "Artes Cênicas", "estado": "RS", "país": "Brasil", "interesses": ["volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Barbara de Albuquerque Silva", "cidade": "Aparecida de Minas", "formação": "Estatística", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Barbara de Azevedo P B F C F Gattolini", "cidade": "Boa Esperanca", "formação": "Música", "estado": "MG", "país": "Brasil", "interesses": ["voleibol","volleyball"] }
{"index": {}}
{"nome": "Barbara de Camargo Moraes", "cidade": "Xanxere", "formação": "Matemática", "estado": "SC", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Barbara de Freitas Marques Coimbra", "cidade": "Lago Verde", "formação": "Física", "estado": "MA", "país": "Brasil", "interesses": ["pintura"] }
{"index": {}}
{"nome": "Barbara de Mariz Silva", "cidade": "Beruri", "formação": "Música", "estado": "AM", "país": "Brasil", "interesses": ["computação","artes"] }
{"index": {}}
{"nome": "Barbara de Oliveira Goncalves", "cidade": "Colonia São João", "formação": "Música", "estado": "RS", "país": "Brasil", "interesses": ["física","computação","artes"] }
{"index": {}}
{"nome": "Barbara de Souza Lima", "cidade": "Pacotuba", "formação": "Estatística", "estado": "ES", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Caetano Costa dos Santos", "cidade": "Pitangueiras", "formação": "Educação Física", "estado": "SP", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Caetano Patta da Porciuncula E Barros", "cidade": "Ouvidor", "formação": "História", "estado": "GO", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Cahenna Salles Othon Teixeira", "cidade": "Jussiape", "formação": "Economia", "estado": "BA", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Caian Silva Nogueira", "cidade": "Águas de São Pedro", "formação": "Música", "estado": "SP", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Caic Goncalves Horvath", "cidade": "São Sebastião do Rio Preto", "formação": "Física", "estado": "MG", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Caike Moreira de Souza", "cidade": "São Sebastião", "formação": "Física", "estado": "CE", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Caina Brinatti Guari", "cidade": "Guararapes", "formação": "Educação Física", "estado": "SP", "país": "Brasil", "interesses": ["artes","pintura"] }
{"index": {}}
{"nome": "Caina de Oliveira Figares", "cidade": "Heliodora", "formação": "Física", "estado": "MG", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Caina de Oliveira Jorge Dittrich", "cidade": "Rio Azul", "formação": "Letras", "estado": "RS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Cainan Alves da Costa", "cidade": "Luiziania", "formação": "Matemática", "estado": "SP", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Cainan Colaco Brunhera", "cidade": "Lucena", "formação": "Educação Física", "estado": "PB", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Cainan Gea", "cidade": "Doutor Mauricio Cardoso", "formação": "História", "estado": "RS", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Caio Abreu Dias de Moura", "cidade": "Ubata", "formação": "Matemática", "estado": "BA", "país": "Brasil", "interesses": ["volei"] }
{"index": {}}
{"nome": "Caio Adriao D Angelo", "cidade": "Bady Bassitt", "formação": "Educação Física", "estado": "SP", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Caio Aguiar", "cidade": "Ibitiura de Minas", "formação": "Artes Cênicas", "estado": "MG", "país": "Brasil", "interesses": ["society","volei","voleibol"] }
{"index": {}}
{"nome": "Caio Aleixo de Melo", "cidade": "Dalbergia", "formação": "Ciências Sociais", "estado": "SC", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Caio Alexandre Neiva de Araujo", "cidade": "Jaciaba", "formação": "Ciência da Computação", "estado": "PR", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Caio Alexsander Marques dos S da Silva", "cidade": "Natividade da Serra", "formação": "Artes Cênicas", "estado": "SP", "país": "Brasil", "interesses": ["física"] }
{"index": {}}
{"nome": "Caio Alvarenga Vilela", "cidade": "Riachao do Dantas", "formação": "Ciências Sociais", "estado": "SE", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Caio Alvares de Angelis", "cidade": "Monteiro Lobato", "formação": "Economia", "estado": "SP", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Caio Alves de Lima", "cidade": "Portelândia", "formação": "Artes Cênicas", "estado": "GO", "país": "Brasil", "interesses": ["society","volei","voleibol"] }
{"index": {}}
{"nome": "Caio Alves Vogt", "cidade": "Baixio da Donana", "formação": "Física", "estado": "CE", "país": "Brasil", "interesses": ["música"] }
{"index": {}}
{"nome": "Caio Andrade Baptista Zocchi", "cidade": "Novo Planalto", "formação": "Matemática", "estado": "RS", "país": "Brasil", "interesses": ["volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Caio Antonio Correia de Paula Fernandes", "cidade": "Conceição de Macabu", "formação": "História", "estado": "RJ", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Caio Anzei Gonsales", "cidade": "Touro Passo", "formação": "Letras", "estado": "RS", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Caio Augusto Batista Peixoto Ormachea", "cidade": "Tauape", "formação": "Ciências Sociais", "estado": "BA", "país": "Brasil", "interesses": ["física","computação","artes"] }
{"index": {}}
{"nome": "Caio Augusto Bertolini", "cidade": "São Raimundo do Doca Bezerra", "formação": "Artes Cênicas", "estado": "MA", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "Caio Augusto Borges Miyoshi", "cidade": "Afonso Cunha", "formação": "Estatística", "estado": "MA", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Caio Augusto Carvalho Guedes Medeiros", "cidade": "Colonia Sapucai", "formação": "Letras", "estado": "PR", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Caio Augusto de Castro da Silva Reis", "cidade": "Rialto", "formação": "Física", "estado": "RJ", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Caio Augusto de Souza", "cidade": "Avai", "formação": "Economia", "estado": "SP", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Caio Augusto Deiroz Amaral", "cidade": "Guapiara", "formação": "Ciências Sociais", "estado": "SP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Caio Augusto Delfino Rezende", "cidade": "Cristiano Otoni", "formação": "Matemática", "estado": "MG", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "Caio Augusto Faria", "cidade": "São Vicente", "formação": "Física", "estado": "GO", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Caio Augusto Fernandes Pereira", "cidade": "Santos Dumont", "formação": "Educação Física", "estado": "MG", "país": "Brasil", "interesses": ["volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Caio Augusto Hudak Franca", "cidade": "Santa Rosa do Piaui", "formação": "História", "estado": "PI", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Caio Augusto Prudente de Souza", "cidade": "Sete Lagoas", "formação": "Ciências Sociais", "estado": "MG", "país": "Brasil", "interesses": ["artes","pintura"] }
{"index": {}}
{"nome": "Caio Augusto Rios Feola", "cidade": "Santo Agostinho", "formação": "Ciências Sociais", "estado": "PE", "país": "Brasil", "interesses": ["pintura","teatro"] }
{"index": {}}
{"nome": "Caio Augusto Zagria Barbosa", "cidade": "Porto Alegre do Norte", "formação": "Economia", "estado": "MT", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Caio Azevedo de Carvalho", "cidade": "Alecrim", "formação": "Economia", "estado": "PR", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Caio Azevedo Trindade", "cidade": "Laje do Banco", "formação": "História", "estado": "BA", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Caio Barrionuevo Mathias", "cidade": "Acudina", "formação": "Estatística", "estado": "BA", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Caio Barrocal Fernandes", "cidade": "Icozinho", "formação": "Música", "estado": "CE", "país": "Brasil", "interesses": ["computação","artes"] }
{"index": {}}
{"nome": "Caio Batista Carra", "cidade": "Rodrigo Silva", "formação": "Economia", "estado": "MG", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Caio Bellini Kambetunava da Silva", "cidade": "Euxenita", "formação": "Física", "estado": "MG", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Caio Beserra Matta", "cidade": "Joia", "formação": "Letras", "estado": "RS", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Caio Bianco Jasper", "cidade": "Goiásanases", "formação": "Economia", "estado": "MG", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Caio Bicudo Duran", "cidade": "Andorinha", "formação": "Letras", "estado": "BA", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Caio Bittencourt Fernandes", "cidade": "Cidade Morena", "formação": "Artes Cênicas", "estado": "MT", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Caio Bolzan Freire", "cidade": "Buritizal", "formação": "Matemática", "estado": "SP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Caio Bonaldi Sousa Pereira", "cidade": "Careiro", "formação": "Educação Física", "estado": "AM", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Da Yeon Choi", "cidade": "Tanques", "formação": "Matemática", "estado": "CE", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Dacio Augusto Castelo Branco G da Silva", "cidade": "Pimenteira", "formação": "História", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Daene Duarte Pereira", "cidade": "Cruanji", "formação": "Ciências Sociais", "estado": "PE", "país": "Brasil", "interesses": ["computação","artes"] }
{"index": {}}
{"nome": "Dafini Leticia Bruno", "cidade": "Frutal do Campo", "formação": "História", "estado": "SP", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Dafne Angela Camargo", "cidade": "Panama", "formação": "Estatística", "estado": "GO", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Dafne Brassolotto Amorim", "cidade": "Candeias", "formação": "Educação Física", "estado": "MG", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Dafne Furtado Nogueira", "cidade": "Itiúba", "formação": "História", "estado": "BA", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Dafne Raca Bromberg", "cidade": "Sussuarana", "formação": "Letras", "estado": "BA", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Daiana Nascimento Viana", "cidade": "Colombia", "formação": "Física", "estado": "SP", "país": "Brasil", "interesses": ["teatro","música"] }
{"index": {}}
{"nome": "Daiana Santos Ryu", "cidade": "Mataripe", "formação": "Física", "estado": "BA", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Daiana Santos Silveira", "cidade": "Cidreira", "formação": "Ciência da Computação", "estado": "RS", "país": "Brasil", "interesses": ["pintura","teatro"] }
{"index": {}}
{"nome": "Daiane Alves Alcantara dos Santos", "cidade": "Apuí", "formação": "Matemática", "estado": "AM", "país": "Brasil", "interesses": ["matemática","física"] }
{"index": {}}
{"nome": "Daiane Alves da Silva", "cidade": "Santa Rita Durão", "formação": "História", "estado": "MG", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Daiane Alves Martins", "cidade": "Carnaubal", "formação": "História", "estado": "CE", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Daiane Campiol Mandaio", "cidade": "Salgadinho", "formação": "Ciência da Computação", "estado": "PB", "país": "Brasil", "interesses": ["física"] }
{"index": {}}
{"nome": "Daiane Cardozo de Souza", "cidade": "Ceraima", "formação": "Ciências Sociais", "estado": "BA", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Daiane Carolina Silva", "cidade": "Aripuana", "formação": "Educação Física", "estado": "MT", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Daiane Cristina de Souza", "cidade": "Poço das Trincheiras", "formação": "Economia", "estado": "AL", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Daiane da Silva Vasconselos", "cidade": "Cantagalo", "formação": "História", "estado": "RJ", "país": "Brasil", "interesses": ["society","volei","voleibol"] }
{"index": {}}
{"nome": "Daiane de Oliveira Portella", "cidade": "Itapagipe", "formação": "Estatística", "estado": "MG", "país": "Brasil", "interesses": ["computação"] }
{"index": {}}
{"nome": "Daiane Domingues Oliveira", "cidade": "Porciuncula", "formação": "História", "estado": "RJ", "país": "Brasil", "interesses": ["volleyball","basquete"] }
{"index": {}}
{"nome": "Daiane dos Santos Dias", "cidade": "Pedras", "formação": "Ciência da Computação", "estado": "CE", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Daiane Leticia Ferreira", "cidade": "Edeia", "formação": "Matemática", "estado": "GO", "país": "Brasil", "interesses": ["volei"] }
{"index": {}}
{"nome": "Daiane Pereira da Cunha", "cidade": "Covo", "formação": "Artes Cênicas", "estado": "PR", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Daiane Pereira Guimaraes", "cidade": "Parecis", "formação": "Educação Física", "estado": "RO", "país": "Brasil", "interesses": ["basquete","matemática","física"] }
{"index": {}}
{"nome": "Daiane Peres", "cidade": "Dona Francisca", "formação": "Economia", "estado": "RS", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Daiane Ribeiro de Souza", "cidade": "Paulo Ramos", "formação": "Matemática", "estado": "MA", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Daiane Rubinato Fernandes", "cidade": "Centralina", "formação": "Economia", "estado": "MG", "país": "Brasil", "interesses": ["volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Daiane Sampaio Fernandes", "cidade": "Barreira dos Campos", "formação": "Ciências Sociais", "estado": "PA", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Daiane Santos Andrade", "cidade": "Cucui", "formação": "Estatística", "estado": "AM", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Daina Edith Paegle Bittar", "cidade": "Aldeia", "formação": "Economia", "estado": "MG", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Dalet de Castro Ferreira Oliveira", "cidade": "Poço Central", "formação": "Música", "estado": "BA", "país": "Brasil", "interesses": ["física","computação","artes"] }
{"index": {}}
{"nome": "Dalila Nunes Alcantara", "cidade": "Engenho Novo", "formação": "Matemática", "estado": "MG", "país": "Brasil", "interesses": ["computação"] }
{"index": {}}
{"nome": "Dalliana Martins Santos de Moraes", "cidade": "Porteirinha de Pedra", "formação": "Letras", "estado": "PB", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Dalton Mata de Jesus", "cidade": "Cezarina", "formação": "Educação Física", "estado": "GO", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Damaris Amancio Silva", "cidade": "Siqueira Belo", "formação": "Ciência da Computação", "estado": "PR", "país": "Brasil", "interesses": ["basquete"] }
{"index": {}}
{"nome": "Damaris Santos Cunha", "cidade": "Itapebi", "formação": "Letras", "estado": "BA", "país": "Brasil", "interesses": ["artes","pintura"] }
{"index": {}}
{"nome": "Damaris Yanagihara", "cidade": "Banquete", "formação": "História", "estado": "RJ", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Damian Nunes Palacios", "cidade": "Bação", "formação": "Matemática", "estado": "MG", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Damiao de Freitas Barros", "cidade": "Faro", "formação": "Estatística", "estado": "PA", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Damiao Siva Santos", "cidade": "Argirita", "formação": "História", "estado": "MG", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Dan Mohamed Salman", "cidade": "Ipuca", "formação": "Matemática", "estado": "RJ", "país": "Brasil", "interesses": ["física","computação","artes"] }
{"index": {}}
{"nome": "Dana Rocha Silveira", "cidade": "Brejo", "formação": "Estatística", "estado": "MA", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Dandara Felicio de Souza", "cidade": "Wenceslau Braz", "formação": "Matemática", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Dandara Zago", "cidade": "Campinas", "formação": "Economia", "estado": "PR", "país": "Brasil", "interesses": ["matemática","física"] }
{"index": {}}
{"nome": "Dani Barki Minkovicius", "cidade": "Taiácupeba", "formação": "História", "estado": "SP", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Daniel Abadi", "cidade": "Rio Grande do Piaui", "formação": "Matemática", "estado": "PI", "país": "Brasil", "interesses": ["pintura","teatro"] }
{"index": {}}
{"nome": "Daniel Abdalla Added Filho", "cidade": "Marilândia", "formação": "Artes Cênicas", "estado": "MG", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Daniel Abranches Poiati", "cidade": "São Paulo", "formação": "Letras", "estado": "PR", "país": "Brasil", "interesses": ["pintura","teatro"] }
{"index": {}}
{"nome": "Daniel Adami Pereira Andrade", "cidade": "Tapurah", "formação": "Artes Cênicas", "estado": "MT", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Daniel Aguilar Gomes", "cidade": "Santa Isabel do Ivai", "formação": "Estatística", "estado": "PR", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Ebert Maiki Silva dos Santos", "cidade": "Nova Iguacu de Goiás", "formação": "Física", "estado": "GO", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Ed Alves de Aquino", "cidade": "Novo Brasil", "formação": "Ciência da Computação", "estado": "GO", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Eddy Klaus Garcia", "cidade": "São Rafael", "formação": "Física", "estado": "ES", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Edenilson Martins Ribeiro", "cidade": "Alfredo Wagner", "formação": "Artes Cênicas", "estado": "SC", "país": "Brasil", "interesses": ["society","volei"] }
{"index": {}}
{"nome": "Eder Amorim Rocha Guedes", "cidade": "Ibiranga", "formação": "Economia", "estado": "PE", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Eder Augusto Marcos da Silva", "cidade": "Jacunda", "formação": "Física", "estado": "PA", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Eder Augusto Sakamoto de Souza", "cidade": "Cachoeira de Emas", "formação": "Ciência da Computação", "estado": "SP", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Eder Cardoso Santana", "cidade": "Ipameri", "formação": "Matemática", "estado": "GO", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Eder Cavalcanti Coimbra", "cidade": "Santo Antonio do Rio Bonito", "formação": "Ciências Sociais", "estado": "MT", "país": "Brasil", "interesses": ["society","volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Eder da Silva", "cidade": "Timonha", "formação": "Educação Física", "estado": "CE", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Eder dos Santos Guimaraes", "cidade": "Prainha", "formação": "Ciências Sociais", "estado": "PA", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Eder Joaquim Esteves", "cidade": "São Roberto", "formação": "Letras", "estado": "MG", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Eder Jose Franco", "cidade": "Jaboti", "formação": "Letras", "estado": "PR", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Eder Leite Gomes", "cidade": "Esquina Bom Sucesso", "formação": "Estatística", "estado": "RS", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Eder Sugimoto Figueiredo", "cidade": "Osvaldo Kroeff", "formação": "História", "estado": "RS", "país": "Brasil", "interesses": ["futebol"] }
{"index": {}}
{"nome": "Ederson Batista Firmino", "cidade": "São José do Xingu", "formação": "Matemática", "estado": "MT", "país": "Brasil", "interesses": ["volei","voleibol"] }
{"index": {}}
{"nome": "Ederson Cavalcante Pereira da Silva", "cidade": "São Pedro", "formação": "Artes Cênicas", "estado": "RN", "país": "Brasil", "interesses": ["volleyball"] }
{"index": {}}
{"nome": "Edezio Carlos Santos Silva Miranda", "cidade": "Lajedo do Cedro", "formação": "Letras", "estado": "PE", "país": "Brasil", "interesses": ["basquete"] }
{"index": {}}
{"nome": "Edgar de Rezende Flauzino", "cidade": "Messejana", "formação": "Estatística", "estado": "CE", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Edgar Garcia dos Santos Neves", "cidade": "São Bento do Tocantins", "formação": "Matemática", "estado": "TO", "país": "Brasil", "interesses": ["teatro","música"] }
{"index": {}}
{"nome": "Edgar Kenji Ishida", "cidade": "Brumado", "formação": "Música", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Edgar Tadashi Matsuda", "cidade": "São João D'oeste", "formação": "Estatística", "estado": "PR", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Edgar Vergopolem Ribeiro", "cidade": "Serra Dourada", "formação": "Matemática", "estado": "BA", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Edgar Yuji Suzuki", "cidade": "Aiuaba", "formação": "Ciências Sociais", "estado": "CE", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Edgard Emanuel de Morais Lopes", "cidade": "Abelardo Luz", "formação": "Ciências Sociais", "estado": "SC", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Edgard Parada Encinas Rabaza", "cidade": "Mandiocaba", "formação": "História", "estado": "PR", "país": "Brasil", "interesses": ["volei"] }
{"index": {}}
{"nome": "Edgard Souza Araujo Junior", "cidade": "Alfredo Wagner", "formação": "Física", "estado": "SC", "país": "Brasil", "interesses": ["society","volei"] }
{"index": {}}
{"nome": "Edigenaldo Leal da Costa", "cidade": "Indaiábira", "formação": "Música", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Edilaine Gomes Fiuza", "cidade": "Giqui", "formação": "Ciência da Computação", "estado": "CE", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Edilene do Socorro Conceicao Bastos", "cidade": "São José do Mato Dentro", "formação": "Economia", "estado": "MG", "país": "Brasil", "interesses": ["volleyball"] }
{"index": {}}
{"nome": "Edilio Nunes Duarte Junior", "cidade": "Riacho Grande", "formação": "Música", "estado": "SP", "país": "Brasil", "interesses": ["volleyball","basquete"] }
{"index": {}}
{"nome": "Edilma Angelica do Nascimento Lins", "cidade": "Tabainha", "formação": "Educação Física", "estado": "CE", "país": "Brasil", "interesses": ["basquete","matemática","física"] }
{"index": {}}
{"nome": "Edilson da Silva Bezerra", "cidade": "Pinheirinhos", "formação": "Música", "estado": "MG", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Edilson Del Vecchio Filho", "cidade": "Cibele", "formação": "Ciência da Computação", "estado": "GO", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Edilton Jose da Silva", "cidade": "Ponta Grossa", "formação": "Economia", "estado": "PR", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Edimilson Rodrigues dos Santos Junior", "cidade": "Água Doce", "formação": "Economia", "estado": "SC", "país": "Brasil", "interesses": ["computação"] }
{"index": {}}
{"nome": "Edinei de Oliveira Filho", "cidade": "Esquina Piratini", "formação": "Música", "estado": "RS", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Edison Santiago de Almeida", "cidade": "Pau A Pique", "formação": "História", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Edison Tsokiti Miyashiro Junior", "cidade": "Terra Roxa", "formação": "História", "estado": "MT", "país": "Brasil", "interesses": ["computação"] }
{"index": {}}
{"nome": "Edison Yamagami Junior", "cidade": "Engenheiro Maiá", "formação": "Ciência da Computação", "estado": "SP", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Edmar de Lena", "cidade": "Rio Novo", "formação": "História", "estado": "PR", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Edmar Rezende de Oliveira Junior", "cidade": "Damianopolis", "formação": "Ciência da Computação", "estado": "GO", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Edmar Rodrigues Filho", "cidade": "Brejo da Serra", "formação": "Artes Cênicas", "estado": "BA", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Edmar Servante Linares Junior", "cidade": "Lucas do Rio Verde", "formação": "Educação Física", "estado": "MT", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Edmarcos Pereira de Souza", "cidade": "Paulistania", "formação": "Matemática", "estado": "SP", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Edmilson Andrade Junior", "cidade": "São Borja", "formação": "Matemática", "estado": "RS", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "Edmilson Jose da Silva Monteiro", "cidade": "Ida Iolanda", "formação": "Letras", "estado": "SP", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Edmur de Carvalho Yorikawa", "cidade": "Santo Antonio dos Milagres", "formação": "História", "estado": "PI", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Edna Maria Ribeiro de Moraes", "cidade": "Lavouras", "formação": "História", "estado": "MT", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Edna Rocha de Sa", "cidade": "São Tiago", "formação": "Estatística", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Ednaldo Goncalves Rocha", "cidade": "Esperanca do Sul", "formação": "Música", "estado": "RS", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Fabia Fusco Peres", "cidade": "LaGoiásnha do Piaui", "formação": "Economia", "estado": "PI", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Fabia Jose da Paz Pereira", "cidade": "Flora Rica", "formação": "Economia", "estado": "SP", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Fabia Soares Nicolini de Deus", "cidade": "Leopoldo de Bulhoes", "formação": "Artes Cênicas", "estado": "GO", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Fabiana Alonso Barbosa", "cidade": "Aguiarnopolis", "formação": "Física", "estado": "TO", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Fabiana Amaral da Silva", "cidade": "Queimadas", "formação": "Estatística", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Fabiana Carolina Ometto", "cidade": "Salvador das Missoes", "formação": "Economia", "estado": "RS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Fabiana Castro Porto Silva Lopes", "cidade": "Vila Santo Antonio", "formação": "Artes Cênicas", "estado": "MT", "país": "Brasil", "interesses": ["volleyball"] }
{"index": {}}
{"nome": "Fabiana Cristina dos Santos", "cidade": "Marcação", "formação": "Letras", "estado": "PB", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Fabiana da Silva Ribeiro", "cidade": "Caieiras", "formação": "Música", "estado": "SP", "país": "Brasil", "interesses": ["artes","pintura"] }
{"index": {}}
{"nome": "Fabiana de Andrade Farias", "cidade": "Cana Verde", "formação": "Artes Cênicas", "estado": "MG", "país": "Brasil", "interesses": ["física","computação"] }
{"index": {}}
{"nome": "Fabiana Dumont Vianna Gathas", "cidade": "Floresta", "formação": "Música", "estado": "PA", "país": "Brasil", "interesses": ["volei"] }
{"index": {}}
{"nome": "Fabiana Falco dos Santos", "cidade": "Monte Recôncavo", "formação": "Economia", "estado": "BA", "país": "Brasil", "interesses": ["society","volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Fabiana Ferreira dos Santos", "cidade": "São João da Ponte", "formação": "Matemática", "estado": "MG", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "Fabiana Fonseca Avelar", "cidade": "Papanduva", "formação": "Matemática", "estado": "SC", "país": "Brasil", "interesses": ["volleyball","basquete"] }
{"index": {}}
{"nome": "Fabiana Francisca Santos da Silva", "cidade": "Mar Grande", "formação": "Economia", "estado": "BA", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Fabiana Granusso", "cidade": "Almirante Tamandare", "formação": "Ciência da Computação", "estado": "PR", "país": "Brasil", "interesses": ["volleyball"] }
{"index": {}}
{"nome": "Fabiana Guimaraes Souza Cruz", "cidade": "Cerro Velho", "formação": "Física", "estado": "PR", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Fabiana Infante Smaira", "cidade": "Jucurutu", "formação": "Música", "estado": "RN", "país": "Brasil", "interesses": ["volleyball"] }
{"index": {}}
{"nome": "Fabiana Kaori Ito", "cidade": "São José de Castro", "formação": "Letras", "estado": "RS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Fabiana Karine Batista", "cidade": "Major Gercino", "formação": "Educação Física", "estado": "SC", "país": "Brasil", "interesses": ["música"] }
{"index": {}}
{"nome": "Fabiana Lais Gomes de Souza", "cidade": "Cerrito", "formação": "Economia", "estado": "RS", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Fabiana Magon Limonete", "cidade": "Tangara", "formação": "Música", "estado": "RN", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Fabiana Mendes Rangel", "cidade": "Nova Monte Verde", "formação": "Educação Física", "estado": "MT", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Fabiana Pereira Velloso", "cidade": "Urucania", "formação": "Física", "estado": "MG", "país": "Brasil", "interesses": ["society","volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Fabiana Rodrigues Pereira", "cidade": "Nina Rodrigues", "formação": "Ciência da Computação", "estado": "MA", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Fabiana Takehara Ishikawa", "cidade": "Garanhuns", "formação": "Estatística", "estado": "PE", "país": "Brasil", "interesses": ["society"] }
{"index": {}}
{"nome": "Fabiana Tavano Martins", "cidade": "São João Batista do Gloria", "formação": "Educação Física", "estado": "MG", "país": "Brasil", "interesses": ["society"] }
{"index": {}}
{"nome": "Fabiana Tavares Brayn Rosati", "cidade": "Vila Conceição", "formação": "Estatística", "estado": "SC", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Fabiana Tiemy Yokota de Oliveira", "cidade": "Santa Teresinha", "formação": "Artes Cênicas", "estado": "RS", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Fabiana Verlangieri Pestana de Andrade", "cidade": "Aracati de Minas", "formação": "Música", "estado": "MG", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Fabiana Won", "cidade": "Comendador Levy Gasparian", "formação": "Física", "estado": "RJ", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Fabiana Yuka Mori", "cidade": "Piquerobi", "formação": "História", "estado": "SP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Fabiana Yumi Murata", "cidade": "Sereno de Cima", "formação": "Economia", "estado": "CE", "país": "Brasil", "interesses": ["basquete"] }
{"index": {}}
{"nome": "Fabiane Barco Maximo", "cidade": "Arabela", "formação": "Matemática", "estado": "SP", "país": "Brasil", "interesses": ["física","computação","artes"] }
{"index": {}}
{"nome": "Fabiane da Silva Daniti", "cidade": "Três Rios", "formação": "Educação Física", "estado": "RJ", "país": "Brasil", "interesses": ["teatro","música"] }
{"index": {}}
{"nome": "Fabiane Hodas", "cidade": "Manga", "formação": "História", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Fabiane Mie Kajiyama", "cidade": "Serido/sao Vicente do Serido", "formação": "Física", "estado": "PB", "país": "Brasil", "interesses": ["volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Fabiane Perim Nogueira", "cidade": "Barra do Rocha", "formação": "Estatística", "estado": "BA", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Fabiane Scandarolli Constancio", "cidade": "Poço das Antas", "formação": "Letras", "estado": "RS", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Fabiano da Silva Rocha", "cidade": "Guaraci", "formação": "Economia", "estado": "SP", "país": "Brasil", "interesses": ["matemática","física"] }
{"index": {}}
{"nome": "Fabiano de Oliveira Santos", "cidade": "João Alfredo", "formação": "História", "estado": "PE", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Fabiano dos Reis Ramos", "cidade": "Aguiarnopolis", "formação": "Ciências Sociais", "estado": "TO", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Fabiano Ferreira Martins", "cidade": "Santa Cruz do Prata", "formação": "História", "estado": "MG", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Fabiano Figueira Fernandes Sampaio", "cidade": "Nova Itaipé", "formação": "Física", "estado": "BA", "país": "Brasil", "interesses": ["society","volei"] }
{"index": {}}
{"nome": "Fabiano Mankishi Shimura", "cidade": "Pinhal Grande", "formação": "Estatística", "estado": "RS", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Fabiano Oliver da Silva", "cidade": "Ibiquera", "formação": "Ciência da Computação", "estado": "BA", "país": "Brasil", "interesses": ["volleyball"] }
{"index": {}}
{"nome": "Fabiano Rogerio Furtado", "cidade": "Espirito Santo do Taua", "formação": "Artes Cênicas", "estado": "PA", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Fabiany Yumi Morioka Ayala", "cidade": "Floresta Azul", "formação": "Educação Física", "estado": "BA", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Fabiel Fernando da Silva", "cidade": "Botuvera", "formação": "Música", "estado": "SC", "país": "Brasil", "interesses": ["volleyball"] }
{"index": {}}
{"nome": "Fabio Afonso Cacalano", "cidade": "Morro Grande", "formação": "Letras", "estado": "RJ", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Fabio Akio Ito", "cidade": "Jaraguari", "formação": "Estatística", "estado": "MS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Ga Il Kim", "cidade": "Nazaré da Mata", "formação": "História", "estado": "PE", "país": "Brasil", "interesses": ["society","volei","voleibol"] }
{"index": {}}
{"nome": "Gabi Dandrea Henkin", "cidade": "Fundão", "formação": "Matemática", "estado": "ES", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Gabriel Addae dos Santos Moreira", "cidade": "Três Vendas", "formação": "Artes Cênicas", "estado": "RS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Gabriel Aguiar de Souza", "cidade": "Ubai", "formação": "Artes Cênicas", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Gabriel Aguiar Franze", "cidade": "Lustosa", "formação": "História", "estado": "BA", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Gabriel Aguiar Santos", "cidade": "Itarema", "formação": "Estatística", "estado": "CE", "país": "Brasil", "interesses": ["teatro","música"] }
{"index": {}}
{"nome": "Gabriel Aguila Slan", "cidade": "Morro do Ferro", "formação": "Ciência da Computação", "estado": "MG", "país": "Brasil", "interesses": ["pintura","teatro"] }
{"index": {}}
{"nome": "Gabriel Ake Ishimoto", "cidade": "Pratania", "formação": "Matemática", "estado": "SP", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Gabriel Akel Abrahao", "cidade": "Feliz Deserto", "formação": "Ciências Sociais", "estado": "AL", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Gabriel Akira Sato Werneck", "cidade": "Porto Seguro", "formação": "Educação Física", "estado": "BA", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Gabriel Alan Buosi", "cidade": "Botuquara", "formação": "Educação Física", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Gabriel Alan Moretti", "cidade": "Boa Esperanca", "formação": "Física", "estado": "PR", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Gabriel Albano Santos", "cidade": "São Paulo do Potengi", "formação": "Estatística", "estado": "RN", "país": "Brasil", "interesses": ["física","computação","artes"] }
{"index": {}}
{"nome": "Gabriel Alberti Rosatti", "cidade": "Porto Real", "formação": "Música", "estado": "RJ", "país": "Brasil", "interesses": ["volei"] }
{"index": {}}
{"nome": "Gabriel Albinati Malaguti", "cidade": "Trombudo Central", "formação": "Educação Física", "estado": "SC", "país": "Brasil", "interesses": ["voleibol","volleyball"] }
{"index": {}}
{"nome": "Gabriel Albuquerque da Costa", "cidade": "Silvano", "formação": "Física", "estado": "MG", "país": "Brasil", "interesses": ["computação"] }
{"index": {}}
{"nome": "Gabriel Alcantara Puntel Ferreira", "cidade": "Muribeca", "formação": "Estatística", "estado": "SE", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Gabriel Aleixo Maia", "cidade": "Itapiuna", "formação": "Letras", "estado": "CE", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Gabriel Alencar de Oliveira", "cidade": "Goiásaninha", "formação": "Estatística", "estado": "RN", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Gabriel Alexandre Vendrame Vourlis", "cidade": "Presidente Bernardes", "formação": "Estatística", "estado": "SP", "país": "Brasil", "interesses": ["society","volei"] }
{"index": {}}
{"nome": "Gabriel Alexandrino Silva", "cidade": "Capim", "formação": "Física", "estado": "PB", "país": "Brasil", "interesses": ["basquete"] }
{"index": {}}
{"nome": "Gabriel Alfredo Almeida dos Santos", "cidade": "Quartel de São João", "formação": "Matemática", "estado": "MG", "país": "Brasil", "interesses": ["matemática","física"] }
{"index": {}}
{"nome": "Gabriel Aliberti Froes", "cidade": "Chorrochó", "formação": "Física", "estado": "BA", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Gabriel Almeida Bispo dos Santos", "cidade": "Vitória do Jari", "formação": "História", "estado": "AP", "país": "Brasil", "interesses": ["volei"] }
{"index": {}}
{"nome": "Gabriel Almeida Cardoso de Souza", "cidade": "Esperantinopolis", "formação": "Estatística", "estado": "MA", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Gabriel Alvarenga Costa", "cidade": "Vila São Francisco", "formação": "Artes Cênicas", "estado": "AL", "país": "Brasil", "interesses": ["volleyball"] }
{"index": {}}
{"nome": "Gabriel Alves Batista de Lima", "cidade": "Biritiba-mirim", "formação": "Letras", "estado": "SP", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Gabriel Alves da Costa Sena", "cidade": "Capim Grosso", "formação": "Ciência da Computação", "estado": "BA", "país": "Brasil", "interesses": ["volei","voleibol"] }
{"index": {}}
{"nome": "Gabriel Alves da Silva Diniz", "cidade": "Novo São Joaquim", "formação": "Ciências Sociais", "estado": "MT", "país": "Brasil", "interesses": ["basquete","matemática","física"] }
{"index": {}}
{"nome": "Gabriel Alves Galdino", "cidade": "Paraguai", "formação": "Artes Cênicas", "estado": "MG", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Gabriel Alves Garcia", "cidade": "Riachão", "formação": "Ciências Sociais", "estado": "MA", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Gabriel Alves Machado", "cidade": "Barão de Aquiraz", "formação": "Música", "estado": "CE", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Gabriel Amaral Silva", "cidade": "Ibertioga", "formação": "Física", "estado": "MG", "país": "Brasil", "interesses": ["basquete","matemática","física"] }
{"index": {}}
{"nome": "Gabriel Amaral Tannis", "cidade": "Livramento", "formação": "Matemática", "estado": "PB", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Gabriel Amaral Zenardi", "cidade": "Bojuru", "formação": "Educação Física", "estado": "RS", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Gabriel Amerio Gandala Avelar", "cidade": "Itapebussu", "formação": "Estatística", "estado": "CE", "país": "Brasil", "interesses": ["society","volei"] }
{"index": {}}
{"nome": "Gabriel Anawate Filho", "cidade": "São Bento do Trairi", "formação": "Ciência da Computação", "estado": "RN", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Gabriel Andrade de Aguiar", "cidade": "Novo Machado", "formação": "Ciência da Computação", "estado": "RS", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Gabriel Andrade Varga", "cidade": "Mucurici", "formação": "Música", "estado": "ES", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Gabriel Andre Bonela", "cidade": "Mirabela", "formação": "Matemática", "estado": "MG", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Gabriel Andreoli Hirata", "cidade": "Passos", "formação": "Artes Cênicas", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Gabriel Andrighetti Moraes", "cidade": "São João de Itaguacu", "formação": "Ciência da Computação", "estado": "SP", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Gabriel Angelo Vasconcelos Sterchile", "cidade": "Pote", "formação": "Letras", "estado": "MG", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Gabriel Annoni", "cidade": "Pimentel", "formação": "Física", "estado": "MA", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "Gabriel Antonio Custodio Silva", "cidade": "Milha", "formação": "Física", "estado": "CE", "país": "Brasil", "interesses": ["volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Gabriel Antonio Ha Pucci", "cidade": "Gamela", "formação": "Matemática", "estado": "PR", "país": "Brasil", "interesses": ["física","computação","artes"] }
{"index": {}}
{"nome": "Gabriel Aparecido Cardoso de Mattos", "cidade": "Reriutaba", "formação": "Ciências Sociais", "estado": "CE", "país": "Brasil", "interesses": ["pintura","teatro"] }
{"index": {}}
{"nome": "Gabriel Apolinario Pereira", "cidade": "Tubarão", "formação": "Ciência da Computação", "estado": "SC", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Gabriel Araujo Amorim", "cidade": "Nova Porteirinha", "formação": "Letras", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Gabriel Araujo Teixeira", "cidade": "Benjamin Constant", "formação": "Música", "estado": "AM", "país": "Brasil", "interesses": ["matemática","física"] }
{"index": {}}
{"nome": "Gabriel Arcanjo Ferreira Andrade", "cidade": "Tangara", "formação": "Economia", "estado": "SC", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Hadassa de Zen Itepan", "cidade": "Terra Rica", "formação": "Letras", "estado": "PR", "país": "Brasil", "interesses": ["basquete"] }
{"index": {}}
{"nome": "Hadriel Geovani da Silva Theodoro", "cidade": "Monte Dourado", "formação": "Física", "estado": "PA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Hae Lee Kim", "cidade": "Garapuava", "formação": "Artes Cênicas", "estado": "MG", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Hagda Cristina Monteiro", "cidade": "Mantiqueira do Palmital", "formação": "Ciências Sociais", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Halana Carmona Figueira", "cidade": "Missal", "formação": "Ciência da Computação", "estado": "PR", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Haline Aparecida de Oliveira Floriano", "cidade": "Piuma", "formação": "Ciência da Computação", "estado": "ES", "país": "Brasil", "interesses": ["computação","artes"] }
{"index": {}}
{"nome": "Halison Weny da Silva", "cidade": "Itajara", "formação": "Ciência da Computação", "estado": "RJ", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Hallef Silva Batista", "cidade": "Nova Gloria", "formação": "Ciência da Computação", "estado": "GO", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Hamde Rodrigues El Hage", "cidade": "Silveira Carvalho", "formação": "Letras", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Hamile Mey Takematsu", "cidade": "Linha Comprida", "formação": "Educação Física", "estado": "RS", "país": "Brasil", "interesses": ["futebol"] }
{"index": {}}
{"nome": "Hamilton Magalhaes Viana Junior", "cidade": "Santa Rosa de Viterbo", "formação": "Física", "estado": "SP", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Hana de Mello Goedert", "cidade": "Machados", "formação": "Letras", "estado": "PE", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Handressa Freitas dos Santos Correia", "cidade": "Machacalis", "formação": "Estatística", "estado": "MG", "país": "Brasil", "interesses": ["volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Hani Samir Jomaa", "cidade": "Resende", "formação": "Artes Cênicas", "estado": "RJ", "país": "Brasil", "interesses": ["física","computação"] }
{"index": {}}
{"nome": "Hanna Abdul Rahman", "cidade": "São Bento do Trairi", "formação": "Ciência da Computação", "estado": "RN", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Hanna Miura", "cidade": "Josénopolis", "formação": "Estatística", "estado": "MG", "país": "Brasil", "interesses": ["volleyball","basquete"] }
{"index": {}}
{"nome": "Hannah Asamie Hiratzuka", "cidade": "Botuporã", "formação": "Artes Cênicas", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Hannah Caroline Evangelista Resende", "cidade": "Itaporanga", "formação": "Ciências Sociais", "estado": "PB", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Hannah Dreicer Krutzler", "cidade": "Ibiraba", "formação": "Física", "estado": "BA", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Hannah Du Bois de Furuyama", "cidade": "Afligidos", "formação": "Ciência da Computação", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Hannah Hemway Sung", "cidade": "Colonia Murici", "formação": "Estatística", "estado": "PR", "país": "Brasil", "interesses": ["volei","voleibol"] }
{"index": {}}
{"nome": "Hannah Santana Herculano", "cidade": "Olho D'Água Dos Dandanhas", "formação": "Física", "estado": "AL", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Hans Edward Gallina", "cidade": "Ponte Alta", "formação": "Economia", "estado": "MG", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Hans Muller", "cidade": "Marilia", "formação": "Ciências Sociais", "estado": "SP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Hans Willians Alves do Carmo", "cidade": "Marilândia do Sul", "formação": "Artes Cênicas", "estado": "PR", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Hares Datti Pascoal", "cidade": "Almirante Tamandare", "formação": "Educação Física", "estado": "PR", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Hariff Eleonora Barbosa", "cidade": "Formigueiro", "formação": "Economia", "estado": "RS", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Harrison Rodrigues Gomes dos Santos", "cidade": "Bom Sucesso", "formação": "Letras", "estado": "SC", "país": "Brasil", "interesses": ["society","volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Harthur Caldeira Antunes", "cidade": "Santa Rosa de Lima", "formação": "Letras", "estado": "SE", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Harue Taniguti Rocha", "cidade": "Rio Antinha", "formação": "Música", "estado": "SC", "país": "Brasil", "interesses": ["física"] }
{"index": {}}
{"nome": "Harumi Isii Motta", "cidade": "Mario Campos", "formação": "História", "estado": "MG", "país": "Brasil", "interesses": ["teatro","música"] }
{"index": {}}
{"nome": "Hassen Ali Barbosa Zoghbi", "cidade": "São Mateus", "formação": "Música", "estado": "RJ", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Hatos Albert Barbosa", "cidade": "Ururai", "formação": "Letras", "estado": "SP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Havy Alexssander Abrami Meirelles", "cidade": "Brejo Bonito", "formação": "Música", "estado": "MG", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "Haydee Puntschart", "cidade": "Dourado", "formação": "Ciência da Computação", "estado": "SP", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "He Jeng Kim", "cidade": "Bela Flor", "formação": "Estatística", "estado": "BA", "país": "Brasil", "interesses": ["society","volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Hean Gi Kim", "cidade": "Olho D'agua De Dentro", "formação": "Estatística", "estado": "PE", "país": "Brasil", "interesses": ["física"] }
{"index": {}}
{"nome": "Hebert de Oliveira Silva", "cidade": "Cuite Velho", "formação": "Ciências Sociais", "estado": "MG", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Hebert Lamounier de Padua Junior", "cidade": "Consolação", "formação": "História", "estado": "MG", "país": "Brasil", "interesses": ["música"] }
{"index": {}}
{"nome": "Hebert Souza Goncalves", "cidade": "Olho-d'agua da Bica", "formação": "Ciências Sociais", "estado": "CE", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Hector Caio Camilo da Silva", "cidade": "Ipora do Oeste", "formação": "Matemática", "estado": "SC", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Hector Castelli Zacharias", "cidade": "Varzedo", "formação": "Matemática", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Hector Enzo Pinheiro da Silva", "cidade": "Bom Jesus da Penha", "formação": "Educação Física", "estado": "MG", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Hector Gabriel Louzada", "cidade": "Nova America da Colina", "formação": "Estatística", "estado": "PR", "país": "Brasil", "interesses": ["futebol"] }
{"index": {}}
{"nome": "Hector Garcia de Andrade", "cidade": "Itaqui", "formação": "Estatística", "estado": "PR", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Hector Makoto Rocco", "cidade": "Olinda Nova do Maranhão", "formação": "Ciências Sociais", "estado": "MA", "país": "Brasil", "interesses": ["society","volei"] }
{"index": {}}
{"nome": "Hector Rodrigues Santana", "cidade": "Cassilândia", "formação": "Ciências Sociais", "estado": "MS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Heder Osny de Souza Honorio", "cidade": "Campestre da Serra", "formação": "Matemática", "estado": "RS", "país": "Brasil", "interesses": ["física","computação"] }
{"index": {}}
{"nome": "Heder Salu Belarmino", "cidade": "Apodi", "formação": "Artes Cênicas", "estado": "RN", "país": "Brasil", "interesses": ["volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Hedras Giovani Sarraf Pacheco", "cidade": "Indaiá Grande", "formação": "Ciências Sociais", "estado": "MS", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Heesue Lee", "cidade": "Morro do Meio", "formação": "Economia", "estado": "SC", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Iago Agrella Fancio", "cidade": "Professor Sperber", "formação": "Economia", "estado": "MG", "país": "Brasil", "interesses": ["física","computação"] }
{"index": {}}
{"nome": "Iago Alvarez Silva", "cidade": "Veranopolis", "formação": "Economia", "estado": "RS", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Iago Atila Azevedo Couto", "cidade": "Engenho", "formação": "Educação Física", "estado": "MT", "país": "Brasil", "interesses": ["física","computação","artes"] }
{"index": {}}
{"nome": "Iago Bueno Bojczuk Camargo", "cidade": "Salgado de São Felix", "formação": "Estatística", "estado": "PB", "país": "Brasil", "interesses": ["computação","artes"] }
{"index": {}}
{"nome": "Iago Bugni Ribeiro", "cidade": "Aracaju", "formação": "Letras", "estado": "SE", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Iago Carvalho de Almeida", "cidade": "Pimenta", "formação": "Letras", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Iago Cesar Ferreira", "cidade": "Jiribatuba", "formação": "História", "estado": "BA", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Iago Costa Urquizas", "cidade": "Arinos", "formação": "Física", "estado": "MG", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Iago Dantas Figueiredo", "cidade": "Itapitanga", "formação": "Artes Cênicas", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Iago de Oliveira Taboada", "cidade": "Gouvelândia", "formação": "Educação Física", "estado": "GO", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Iago Donatoni Pinheiro", "cidade": "Santa Luzia", "formação": "Economia", "estado": "MA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Iago Fernandes de Sousa", "cidade": "Senador La Rocque", "formação": "Educação Física", "estado": "MA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Iago Fittipaldi Gardin Costa", "cidade": "Riversul", "formação": "Matemática", "estado": "SP", "país": "Brasil", "interesses": ["voleibol","volleyball"] }
{"index": {}}
{"nome": "Iago Freitas Piedade", "cidade": "Senador Guiomard", "formação": "Economia", "estado": "AC", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Iago Gomes Panza", "cidade": "Bela Vista do Toldo", "formação": "Letras", "estado": "SC", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Iago Graziano Gazzara", "cidade": "Aratama", "formação": "Letras", "estado": "CE", "país": "Brasil", "interesses": ["volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Iago Higa Padial", "cidade": "Barracas", "formação": "Artes Cênicas", "estado": "BA", "país": "Brasil", "interesses": ["volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Iago Martinelli Lopes", "cidade": "Ibicoara", "formação": "Música", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Iago Oliveira Ferradans", "cidade": "Fortaleza do Taboção", "formação": "Artes Cênicas", "estado": "TO", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Iago Orlandi Gazola", "cidade": "Natividade", "formação": "Física", "estado": "TO", "país": "Brasil", "interesses": ["física","computação"] }
{"index": {}}
{"nome": "Iago Pires Garcia", "cidade": "Debrasa", "formação": "Artes Cênicas", "estado": "MS", "país": "Brasil", "interesses": ["matemática","física"] }
{"index": {}}
{"nome": "Iago Ramirez", "cidade": "Belo Oriente", "formação": "História", "estado": "MG", "país": "Brasil", "interesses": ["volleyball"] }
{"index": {}}
{"nome": "Iago Richard da Anunciacao da Silva", "cidade": "Armazem", "formação": "História", "estado": "SC", "país": "Brasil", "interesses": ["volleyball","basquete"] }
{"index": {}}
{"nome": "Iago Silveira Fernandes", "cidade": "Baulândia", "formação": "Música", "estado": "PR", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Iago Taveira Pimentel", "cidade": "Espirito Santo do Pinhal", "formação": "Ciência da Computação", "estado": "SP", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Iago Trindade", "cidade": "Lavouras", "formação": "Letras", "estado": "MT", "país": "Brasil", "interesses": ["volei"] }
{"index": {}}
{"nome": "Iago Vinicius Teodoro Carraschi", "cidade": "Hortolândia", "formação": "Artes Cênicas", "estado": "SP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Iale Lauro Rezende Ferreira", "cidade": "São Bento do Una", "formação": "Artes Cênicas", "estado": "PE", "país": "Brasil", "interesses": ["futebol"] }
{"index": {}}
{"nome": "Iam Seidi Benazzi", "cidade": "Riachuelo", "formação": "Estatística", "estado": "SE", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Ian Alberto Ribeiro Christani", "cidade": "Saldanha Marinho", "formação": "Artes Cênicas", "estado": "RS", "país": "Brasil", "interesses": ["volei","voleibol"] }
{"index": {}}
{"nome": "Ian Andrew Chinen Robertson", "cidade": "São Judas Tadeu", "formação": "Ciência da Computação", "estado": "PR", "país": "Brasil", "interesses": ["society","volei","voleibol"] }
{"index": {}}
{"nome": "Ian Aurichio de Mello", "cidade": "Peruibe", "formação": "Matemática", "estado": "SP", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Ian Banic", "cidade": "Colonia do Gurgueia", "formação": "Letras", "estado": "PI", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "Ian de Alencar Irizawa", "cidade": "Roteiro", "formação": "Educação Física", "estado": "AL", "país": "Brasil", "interesses": ["volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Ian de Almeida Pernambuco Sachs", "cidade": "Catuira", "formação": "Ciências Sociais", "estado": "SC", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Ian Del Ry", "cidade": "João Dias", "formação": "Matemática", "estado": "RN", "país": "Brasil", "interesses": ["volleyball","basquete"] }
{"index": {}}
{"nome": "Ian Ferreira Neves Camargo", "cidade": "Simões Filho", "formação": "Música", "estado": "BA", "país": "Brasil", "interesses": ["society"] }
{"index": {}}
{"nome": "Ian Hideyuki Fugitani Sato", "cidade": "Pedro Ii", "formação": "Economia", "estado": "PI", "país": "Brasil", "interesses": ["society","volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Ian Kim", "cidade": "Santa Maria Madalena", "formação": "Matemática", "estado": "RJ", "país": "Brasil", "interesses": ["volei","voleibol"] }
{"index": {}}
{"nome": "Ian Marcelo Camargo Garcia", "cidade": "Divinolândia de Minas", "formação": "Letras", "estado": "MG", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Ian Mariotto Beneti", "cidade": "Cajazeirinhas", "formação": "Física", "estado": "PB", "país": "Brasil", "interesses": ["society","volei"] }
{"index": {}}
{"nome": "Ian Marques Pelegrini", "cidade": "Campo Grande", "formação": "Música", "estado": "PB", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Ian Mello Degaspari", "cidade": "Cangas", "formação": "Ciência da Computação", "estado": "MT", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "Ian Soares de Souza", "cidade": "Chui", "formação": "Física", "estado": "RS", "país": "Brasil", "interesses": ["volei"] }
{"index": {}}
{"nome": "Iana Carolina Perea Ribeiro de Souza", "cidade": "Montes Claros de Goiás", "formação": "Música", "estado": "GO", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Ianca Almeida da Silva", "cidade": "Ituporanga", "formação": "Artes Cênicas", "estado": "SC", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Iane Pimenta de Mattos", "cidade": "Mesopolis", "formação": "Música", "estado": "SP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Ianka Suellen Rothenberger Martins", "cidade": "São Luiz do Norte", "formação": "Ciência da Computação", "estado": "GO", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Iann Victor Santos Vandi", "cidade": "Luis Domingues", "formação": "Artes Cênicas", "estado": "MA", "país": "Brasil", "interesses": ["física","computação","artes"] }
{"index": {}}
{"nome": "Iara da Rocha Louzada", "cidade": "Itamarati", "formação": "Ciências Sociais", "estado": "MG", "país": "Brasil", "interesses": ["computação","artes"] }
{"index": {}}
{"nome": "Iara Fortunato Citron", "cidade": "Ibirapitanga", "formação": "Física", "estado": "BA", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Jaciely Gabriela Melo da Silva", "cidade": "Agropolis Bela Vista", "formação": "Ciências Sociais", "estado": "PA", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Jack Woei Jen Lan", "cidade": "São Fidelis", "formação": "Educação Física", "estado": "RJ", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Jackeline Aparecida Jardim", "cidade": "Minador do Negrão", "formação": "Artes Cênicas", "estado": "AL", "país": "Brasil", "interesses": ["física"] }
{"index": {}}
{"nome": "Jackeline Kanarski Braz da Silva", "cidade": "Pauini", "formação": "Artes Cênicas", "estado": "AM", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Jackson Aparecido de Souza Rosa", "cidade": "Petropolis", "formação": "Educação Física", "estado": "RJ", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Jackson Cirillo", "cidade": "Major Porto", "formação": "Música", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Jackson da Silva Medeiros", "cidade": "Dom Macedo Costa", "formação": "História", "estado": "BA", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Jackson dos Santos Roque da Silva", "cidade": "São Joaquim de Bicas", "formação": "Música", "estado": "MG", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Jackson Epifanio da Rocha Neves", "cidade": "Gavião", "formação": "História", "estado": "MG", "país": "Brasil", "interesses": ["voleibol","volleyball"] }
{"index": {}}
{"nome": "Jackson Wesley Silva dos Santos", "cidade": "Marimbondo", "formação": "Estatística", "estado": "PR", "país": "Brasil", "interesses": ["computação","artes"] }
{"index": {}}
{"nome": "Jackson Xian Zhe Wang", "cidade": "Barra da Prata", "formação": "História", "estado": "SC", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Jacobus Laurens de Jager", "cidade": "São José das Laranjeiras", "formação": "História", "estado": "SP", "país": "Brasil", "interesses": ["volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Jacqueline Alves Rena", "cidade": "Bela Vista", "formação": "Música", "estado": "SC", "país": "Brasil", "interesses": ["society"] }
{"index": {}}
{"nome": "Jacqueline de Souza Hayaxibara Goto", "cidade": "Cafe", "formação": "Educação Física", "estado": "ES", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Jacqueline Diogo Gomes", "cidade": "Conchas", "formação": "Física", "estado": "SP", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Jacqueline Furlan", "cidade": "Urucuri", "formação": "Letras", "estado": "PA", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Jacqueline Garutti Lopes", "cidade": "Albertos", "formação": "Ciências Sociais", "estado": "MG", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Jacqueline Maria Ferraz Tsubak", "cidade": "Rio das Mortes", "formação": "História", "estado": "PR", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Jacqueline Mariana da Silva Udala", "cidade": "Nova Mamore", "formação": "Ciências Sociais", "estado": "RO", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Jacqueline Moreira Goncalves", "cidade": "Coronel Goulart", "formação": "Física", "estado": "SP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Jacqueline Mylena de Camargo", "cidade": "Paraiso do Tocantins", "formação": "Matemática", "estado": "TO", "país": "Brasil", "interesses": ["society","volei","voleibol"] }
{"index": {}}
{"nome": "Jacqueline Pereira", "cidade": "Igapo", "formação": "Economia", "estado": "PE", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Jacqueline Pereira Rocha", "cidade": "Irajuba", "formação": "Educação Física", "estado": "BA", "país": "Brasil", "interesses": ["pintura","teatro"] }
{"index": {}}
{"nome": "Jacqueline Quissi Santos", "cidade": "Macau", "formação": "Economia", "estado": "RN", "país": "Brasil", "interesses": ["society","volei"] }
{"index": {}}
{"nome": "Jacqueline Resende Berriel Hochberg", "cidade": "Remansão", "formação": "Música", "estado": "PA", "país": "Brasil", "interesses": ["volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Jacqueline Saconi", "cidade": "Felicio dos Santos", "formação": "Música", "estado": "MG", "país": "Brasil", "interesses": ["física","computação"] }
{"index": {}}
{"nome": "Jacqueline Sawazaki Nakagome", "cidade": "Jatoba", "formação": "Ciência da Computação", "estado": "MT", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Jacqueline Sayuri Rodrigues", "cidade": "Coronel José Dias", "formação": "Estatística", "estado": "PI", "país": "Brasil", "interesses": ["física","computação"] }
{"index": {}}
{"nome": "Jacqueline Shirleysantos", "cidade": "Tamboara", "formação": "Matemática", "estado": "PR", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Jacqueline Simoes", "cidade": "Alianca do Tocantins", "formação": "Ciências Sociais", "estado": "TO", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Jacqueline Vergely Fraga Ferreira", "cidade": "Jubaiá", "formação": "Matemática", "estado": "CE", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Jade Alves dos Anjos", "cidade": "Poxim do Sul", "formação": "Ciência da Computação", "estado": "BA", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Jade Antunes Nascimento", "cidade": "Dom Pedro de Alcantara", "formação": "Ciências Sociais", "estado": "RS", "país": "Brasil", "interesses": ["volleyball","basquete"] }
{"index": {}}
{"nome": "Jade Cariolin Cortez Gali", "cidade": "Porto Alegre do Tocantins", "formação": "Educação Física", "estado": "TO", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "Jade Coelho Rodrigues", "cidade": "Passa Una", "formação": "Letras", "estado": "PR", "país": "Brasil", "interesses": ["voleibol","volleyball"] }
{"index": {}}
{"nome": "Jade Daniela Rodrigues", "cidade": "Senador Salgado Filho", "formação": "História", "estado": "RS", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Jade Oumura Melo", "cidade": "Divino", "formação": "Ciências Sociais", "estado": "RS", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Jade Soares Lara", "cidade": "Aquidaba", "formação": "Economia", "estado": "SE", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Jade Valim Camargo Righetto Rosa", "cidade": "Mantena", "formação": "Ciência da Computação", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Jade Vieira Cavalhieri", "cidade": "Primavera", "formação": "Física", "estado": "MT", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Jade Vtioria Rodrigues Reis", "cidade": "Lagoa da Pedra", "formação": "Letras", "estado": "AL", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Jader Bacci Junqueira", "cidade": "Divino de Virgolândia", "formação": "Letras", "estado": "MG", "país": "Brasil", "interesses": ["pintura","teatro"] }
{"index": {}}
{"nome": "Jader da Silva Berck", "cidade": "Itaquarai", "formação": "Matemática", "estado": "BA", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Jader Tadeu de Jesus B Jabour", "cidade": "Guaira", "formação": "História", "estado": "SP", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Jadiel Aguiar E Silva", "cidade": "Ribeira do Piaui", "formação": "Educação Física", "estado": "PI", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Jae Won Park", "cidade": "Liberdade", "formação": "Ciências Sociais", "estado": "MG", "país": "Brasil", "interesses": ["voleibol","volleyball"] }
{"index": {}}
{"nome": "Jaff Gustavo Cunha", "cidade": "Tupandi", "formação": "Ciências Sociais", "estado": "RS", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Jailane de Sousa Gomes", "cidade": "Lapão", "formação": "Estatística", "estado": "BA", "país": "Brasil", "interesses": ["pintura"] }
{"index": {}}
{"nome": "Jailda Santos Vasconcelos", "cidade": "Vinhatico", "formação": "Física", "estado": "ES", "país": "Brasil", "interesses": ["volei"] }
{"index": {}}
{"nome": "Jailton Santos Reis", "cidade": "Catingal", "formação": "Matemática", "estado": "BA", "país": "Brasil", "interesses": ["volleyball","basquete"] }
{"index": {}}
{"nome": "Jaime Ferreira da Silva Neto", "cidade": "Brejinho", "formação": "Física", "estado": "PE", "país": "Brasil", "interesses": ["pintura"] }
{"index": {}}
{"nome": "Kaan Oliveira Guimaraes", "cidade": "Braco do Trombudo", "formação": "Economia", "estado": "SC", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Kadu Vinicius Toledo", "cidade": "Nova Aurora", "formação": "Educação Física", "estado": "GO", "país": "Brasil", "interesses": ["pintura"] }
{"index": {}}
{"nome": "Kaiana Recchia", "cidade": "Bela Vista", "formação": "Artes Cênicas", "estado": "RS", "país": "Brasil", "interesses": ["artes","pintura"] }
{"index": {}}
{"nome": "Kailani Amim Postilhoni Ferreira", "cidade": "Sapucaiá do Sul", "formação": "História", "estado": "RS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Kainan Berto Sousa Santos", "cidade": "Afonso Claudio", "formação": "Música", "estado": "ES", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Kainara Ferreira de Souza", "cidade": "Campo Grande do Piaui", "formação": "Letras", "estado": "PI", "país": "Brasil", "interesses": ["pintura","teatro"] }
{"index": {}}
{"nome": "Kaio Alves Chaves", "cidade": "Borrazopolis", "formação": "Letras", "estado": "PR", "país": "Brasil", "interesses": ["volei","voleibol"] }
{"index": {}}
{"nome": "Kaio Cassio dos Santos", "cidade": "Moeda", "formação": "Educação Física", "estado": "MG", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Kaio Felippe Secchinato", "cidade": "Amanda", "formação": "Física", "estado": "MG", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Kaio Takase", "cidade": "Itajai", "formação": "Ciências Sociais", "estado": "SC", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Kaio Teles Ogawa", "cidade": "Presidente Juscelino", "formação": "Economia", "estado": "MA", "país": "Brasil", "interesses": ["volleyball"] }
{"index": {}}
{"nome": "Kaio Vieira dos Santos", "cidade": "Trindade do Sul", "formação": "Música", "estado": "RS", "país": "Brasil", "interesses": ["basquete","matemática","física"] }
{"index": {}}
{"nome": "Kaio Vinicius da Costa E Silva", "cidade": "Rolim de Moura", "formação": "Artes Cênicas", "estado": "RO", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Kaique Baldon Barretto", "cidade": "Mantenopolis", "formação": "Ciências Sociais", "estado": "ES", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Kaique Barbarito Costa Lopes", "cidade": "Descalvado", "formação": "Economia", "estado": "SP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Kaique Bezerra", "cidade": "Andes", "formação": "Ciência da Computação", "estado": "SP", "país": "Brasil", "interesses": ["volleyball","basquete"] }
{"index": {}}
{"nome": "Kaique da Silva Bittencourt Soares", "cidade": "Parnamirim", "formação": "História", "estado": "RN", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Kaique Dantas Oliveira", "cidade": "Carnaubal", "formação": "História", "estado": "CE", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Kaique de Queiroz", "cidade": "Ibarama", "formação": "Artes Cênicas", "estado": "RS", "país": "Brasil", "interesses": ["pintura"] }
{"index": {}}
{"nome": "Kaique Gomes de Meneses", "cidade": "Paulistania", "formação": "Letras", "estado": "PR", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Kaique Lima da Costa", "cidade": "Casa Grande", "formação": "Artes Cênicas", "estado": "MG", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Kaique Maestrini Sacchi", "cidade": "Frederico Wastner", "formação": "Artes Cênicas", "estado": "SC", "país": "Brasil", "interesses": ["volei","voleibol"] }
{"index": {}}
{"nome": "Kaique Mendonca Barbosa", "cidade": "Igaracu do Tiete", "formação": "Estatística", "estado": "SP", "país": "Brasil", "interesses": ["pintura"] }
{"index": {}}
{"nome": "Kaique Oliveira Cedro", "cidade": "Nova Modica", "formação": "História", "estado": "MG", "país": "Brasil", "interesses": ["volei"] }
{"index": {}}
{"nome": "Kaique Rodrigues da Silva", "cidade": "Jenipapo de Minas", "formação": "Educação Física", "estado": "MG", "país": "Brasil", "interesses": ["pintura","teatro"] }
{"index": {}}
{"nome": "Kaique Ruan Rezende Santos", "cidade": "Marilândia do Sul", "formação": "Música", "estado": "PR", "país": "Brasil", "interesses": ["matemática","física"] }
{"index": {}}
{"nome": "Kaique Santhiago da Costa Afonso Geraldo", "cidade": "Dias D Avila", "formação": "Ciência da Computação", "estado": "BA", "país": "Brasil", "interesses": ["volleyball"] }
{"index": {}}
{"nome": "Kaique Silva de Farias", "cidade": "Carnaubeira da Penha", "formação": "Letras", "estado": "PE", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Kaique Sombra Santiago Araujo", "cidade": "Curral Falso", "formação": "Música", "estado": "BA", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Kaique Souza Fernandes de Vasconcelos", "cidade": "Governador Edison Lobão", "formação": "Letras", "estado": "MA", "país": "Brasil", "interesses": ["física","computação"] }
{"index": {}}
{"nome": "Kairo Luiz dos Santos Bonicenha", "cidade": "Colonia Santos Andrade", "formação": "Ciências Sociais", "estado": "PR", "país": "Brasil", "interesses": ["física","computação","artes"] }
{"index": {}}
{"nome": "Kairos Ribeiro Chi", "cidade": "Marmelândia", "formação": "Estatística", "estado": "PR", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Kalebe Rodrigues Santos", "cidade": "Lumiar", "formação": "Matemática", "estado": "RJ", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Kaled Omar El Kadri", "cidade": "Ameixas", "formação": "Física", "estado": "PE", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Kaliane Santos Oliveira", "cidade": "Conceição do Castelo", "formação": "Estatística", "estado": "ES", "país": "Brasil", "interesses": ["matemática","física"] }
{"index": {}}
{"nome": "Kaline Bombonatti Olenski", "cidade": "Major Isidoro", "formação": "História", "estado": "AL", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Kalinka Favorin Rodrigues", "cidade": "São Bento do Sapucai", "formação": "Educação Física", "estado": "SP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Kalley Menezes Carvalho Alves", "cidade": "Odilândia", "formação": "Estatística", "estado": "PB", "país": "Brasil", "interesses": ["computação","artes"] }
{"index": {}}
{"nome": "Kalua Mazolli Leone", "cidade": "Mendonca", "formação": "Música", "estado": "MG", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Kalyne Jeuken Teixeira", "cidade": "Jaborandi", "formação": "Matemática", "estado": "PR", "país": "Brasil", "interesses": ["física"] }
{"index": {}}
{"nome": "Kamila Barbosa Knebel Bravo", "cidade": "Hidreletrica Tucurui", "formação": "Estatística", "estado": "PA", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Kamila Oliveira Santos", "cidade": "Taquaralto", "formação": "Matemática", "estado": "TO", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Kamila Rocha Pereira", "cidade": "Palmatoria", "formação": "Matemática", "estado": "CE", "país": "Brasil", "interesses": ["society","volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Kamila Stocco Kerckhoff", "cidade": "Santo Antonio do Ica", "formação": "Música", "estado": "AM", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Kamila Yuka Simoe", "cidade": "Juazeiro", "formação": "Ciências Sociais", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Kamilla Louise Ferreira", "cidade": "Jequirica", "formação": "Educação Física", "estado": "BA", "país": "Brasil", "interesses": ["matemática","física"] }
{"index": {}}
{"nome": "Kamilla Souza Rodrigues C Bandeira", "cidade": "Firmino Alves", "formação": "Artes Cênicas", "estado": "BA", "país": "Brasil", "interesses": [] }


GET pessoas/_count


POST /pessoas/_bulk
{"index": {}}
{"nome": "Kamille Carlete Matielo", "cidade": "Senhora da Gloria", "formação": "Economia", "estado": "MG", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Kandy Horita", "cidade": "Vila Dirce", "formação": "Artes Cênicas", "estado": "SP", "país": "Brasil", "interesses": ["society","volei","voleibol"] }
{"index": {}}
{"nome": "Karen Ayumi Miyamoto", "cidade": "Dores do Rio Preto", "formação": "História", "estado": "ES", "país": "Brasil", "interesses": ["volei","voleibol"] }
{"index": {}}
{"nome": "Karen Batista Caixeta", "cidade": "Porto Novo", "formação": "Física", "estado": "SP", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Laelia Kamigashima Kohmann", "cidade": "Ouro Verde do Piquiri", "formação": "Ciência da Computação", "estado": "PR", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Laera Giulia Molinari Roberto", "cidade": "Indiaroba", "formação": "Matemática", "estado": "SE", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Laercio Alves Nogueira", "cidade": "Santo Augusto", "formação": "Artes Cênicas", "estado": "RS", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Laercio de Oliveira Junior", "cidade": "Socorro do Piaui", "formação": "Estatística", "estado": "PI", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Lahayda Lohara Mamani Poma Dreger", "cidade": "Guzolândia", "formação": "Educação Física", "estado": "SP", "país": "Brasil", "interesses": ["música"] }
{"index": {}}
{"nome": "Laiane Eleuterio da Silva", "cidade": "Arapongas", "formação": "Artes Cênicas", "estado": "PR", "país": "Brasil", "interesses": ["física","computação"] }
{"index": {}}
{"nome": "Laila Maria Bortollotti Donadon", "cidade": "Arroio dos Ratos", "formação": "Música", "estado": "RS", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Laila Reis", "cidade": "Antonina", "formação": "Física", "estado": "PR", "país": "Brasil", "interesses": ["basquete"] }
{"index": {}}
{"nome": "Laila Vera Fett de Oliveira", "cidade": "Barra do Jacuípe", "formação": "História", "estado": "BA", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Lair Franca de Almeida", "cidade": "Carmolândia", "formação": "Música", "estado": "TO", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Lais Adriana Barbosa Ferreira", "cidade": "Andorinhas", "formação": "Matemática", "estado": "PR", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Lais Alessandra Ferreira", "cidade": "Passa Sete", "formação": "Matemática", "estado": "RS", "país": "Brasil", "interesses": ["física"] }
{"index": {}}
{"nome": "Lais Alonso de Souza", "cidade": "Santa Tereza do Oeste", "formação": "Ciência da Computação", "estado": "PR", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Lais Arruda Wagner", "cidade": "Nordestina", "formação": "Ciências Sociais", "estado": "BA", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Lais Ayami Higa de Moraes", "cidade": "Prata", "formação": "Matemática", "estado": "SC", "país": "Brasil", "interesses": ["pintura","teatro"] }
{"index": {}}
{"nome": "Lais Ayume Lima Mune", "cidade": "Porto Real", "formação": "Artes Cênicas", "estado": "RJ", "país": "Brasil", "interesses": ["volei","voleibol"] }
{"index": {}}
{"nome": "Lais Barroso Dutra", "cidade": "São Francisco", "formação": "Estatística", "estado": "CE", "país": "Brasil", "interesses": ["volei","voleibol"] }
{"index": {}}
{"nome": "Lais Bento Cazelato", "cidade": "Macuco", "formação": "História", "estado": "RJ", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Lais Bernardes Bonacin", "cidade": "Carneiros", "formação": "Ciências Sociais", "estado": "AL", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Lais Bernardi Figueiredo Horta", "cidade": "Ibipeba", "formação": "Matemática", "estado": "BA", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Lais Botigelli Novelli", "cidade": "Vitorino", "formação": "História", "estado": "PR", "país": "Brasil", "interesses": ["volleyball","basquete"] }
{"index": {}}
{"nome": "Lais Caires Nunes", "cidade": "Vale do Sol", "formação": "Ciência da Computação", "estado": "RS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Lais Carbonari Brito", "cidade": "AlaGoiásnhas", "formação": "Educação Física", "estado": "BA", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "Lais Caroline dos Reis", "cidade": "Vila Nelita", "formação": "História", "estado": "ES", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Lais Caroline Fugolari", "cidade": "Corbelia", "formação": "Educação Física", "estado": "PR", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Lais Caroline Ribeiro", "cidade": "Toledo", "formação": "História", "estado": "SP", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Lais Cavalheiro Seneme", "cidade": "São João do Pinhal", "formação": "Artes Cênicas", "estado": "PR", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Lais Coutinho Zayas Jimenez", "cidade": "Santa Barbara do Tugurio", "formação": "Matemática", "estado": "MG", "país": "Brasil", "interesses": ["volei","voleibol"] }
{"index": {}}
{"nome": "Lais Crepaldi Henriques", "cidade": "Nova Videira", "formação": "Economia", "estado": "PR", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Lais Cristina Barbosa dos Santos", "cidade": "Águas da Prata", "formação": "Ciência da Computação", "estado": "SP", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Lais Cristina Vieira Bulgarelli", "cidade": "Castrinopolis", "formação": "Matemática", "estado": "GO", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Lais da Silva Souza", "cidade": "Guidoval", "formação": "Letras", "estado": "MG", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Lais Dantas Augusto", "cidade": "Itapó", "formação": "Artes Cênicas", "estado": "CE", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Lais de Andrade Silva", "cidade": "Comercinho", "formação": "Letras", "estado": "MG", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Lais de Mello Espirito Santo", "cidade": "Mata Limpa", "formação": "Estatística", "estado": "PB", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Lais de Oliveira Lima", "cidade": "Morro Redondo", "formação": "Educação Física", "estado": "RS", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Lais de Paula Goncalves Sampaio", "cidade": "Conceição de Piracicaba", "formação": "Matemática", "estado": "MG", "país": "Brasil", "interesses": ["pintura"] }
{"index": {}}
{"nome": "Lais Dias Leite de Oliveira", "cidade": "Santa Barbara D'oeste", "formação": "Educação Física", "estado": "SP", "país": "Brasil", "interesses": ["basquete"] }
{"index": {}}
{"nome": "Lais Disep dos Santos", "cidade": "Barauna", "formação": "Educação Física", "estado": "RN", "país": "Brasil", "interesses": ["volei","voleibol"] }
{"index": {}}
{"nome": "Lais Domiciano dos Santos", "cidade": "Cordilheira", "formação": "Letras", "estado": "RS", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Lais dos Santos Penna", "cidade": "Paulista", "formação": "História", "estado": "PB", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Lais Dumitrescu Dias", "cidade": "Planalto", "formação": "Física", "estado": "SC", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Lais Felix de Andrade", "cidade": "Rafael Godeiro", "formação": "Ciências Sociais", "estado": "RN", "país": "Brasil", "interesses": ["artes","pintura"] }
{"index": {}}
{"nome": "Lais Fernanda Ferreira Ferraz", "cidade": "Dez de Maio", "formação": "Ciência da Computação", "estado": "PR", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Lais Fernanda Lopes Wada", "cidade": "Caruara", "formação": "História", "estado": "SP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Lais Fernandes Troina", "cidade": "Padre Brito", "formação": "Ciências Sociais", "estado": "MG", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Lais Fonseca Nogueira", "cidade": "Cha Grande", "formação": "Física", "estado": "PE", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Lais Fray Ribeiro", "cidade": "Miralta", "formação": "Educação Física", "estado": "MG", "país": "Brasil", "interesses": ["pintura"] }
{"index": {}}
{"nome": "Lais Frota Valenciano", "cidade": "Tigipio", "formação": "Física", "estado": "SC", "país": "Brasil", "interesses": ["física","computação"] }
{"index": {}}
{"nome": "Lais Fusco Mendes", "cidade": "Capão do Cipo", "formação": "Ciências Sociais", "estado": "RS", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Lais Gama Lobo", "cidade": "Ipuacu", "formação": "Matemática", "estado": "RS", "país": "Brasil", "interesses": ["society","volei","voleibol"] }
{"index": {}}
{"nome": "Mabila Tuany Marangon Marciano", "cidade": "Novo Horizonte", "formação": "Matemática", "estado": "SC", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Mabily Silva Gondim", "cidade": "Seabra", "formação": "Educação Física", "estado": "BA", "país": "Brasil", "interesses": ["volei","voleibol"] }
{"index": {}}
{"nome": "Macario Arosti Rebelo", "cidade": "Varzea Grande", "formação": "Letras", "estado": "PI", "país": "Brasil", "interesses": ["volei"] }
{"index": {}}
{"nome": "Maeli Putti", "cidade": "São José do Mato Dentro", "formação": "Física", "estado": "MG", "país": "Brasil", "interesses": ["society","volei","voleibol"] }
{"index": {}}
{"nome": "Magali Pereira de Souza", "cidade": "Nova Olimpia", "formação": "Física", "estado": "PR", "país": "Brasil", "interesses": ["artes","pintura"] }
{"index": {}}
{"nome": "Magda Marcia Gomes de Araujo", "cidade": "Caripi", "formação": "História", "estado": "PA", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Magda Nunes Custodio", "cidade": "Costa Rica", "formação": "História", "estado": "MS", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Magna Martins de Lima", "cidade": "Pindamonhangaba", "formação": "Matemática", "estado": "SP", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Magna Rodrigues de Barros", "cidade": "Ponta de Ramos", "formação": "Música", "estado": "PA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Magno Alves da Silva", "cidade": "São João do Sabugi", "formação": "Estatística", "estado": "RN", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Magno de Paula Schreder", "cidade": "Pentecoste", "formação": "Estatística", "estado": "CE", "país": "Brasil", "interesses": ["música"] }
{"index": {}}
{"nome": "Magno Frederico Kray Costa", "cidade": "Campestre de Goiás", "formação": "Matemática", "estado": "GO", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Magno Santos de Oliveira", "cidade": "Bixopa", "formação": "Matemática", "estado": "CE", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Mahara Natalha Matias", "cidade": "Santa Maria do Gurupa", "formação": "Ciências Sociais", "estado": "SP", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Mahya Thau Baldacci", "cidade": "Jussari", "formação": "Ciência da Computação", "estado": "BA", "país": "Brasil", "interesses": ["música"] }
{"index": {}}
{"nome": "Maiane Bispo Barreto da Silva", "cidade": "São Felix do Tocantins", "formação": "Economia", "estado": "TO", "país": "Brasil", "interesses": ["voleibol","volleyball"] }
{"index": {}}
{"nome": "Maiara Antunes Leite Santos", "cidade": "Torquato Severo", "formação": "História", "estado": "RS", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Maiara Aparecida Pinheiro", "cidade": "Tamburil", "formação": "Artes Cênicas", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Maiara Baena Genovez", "cidade": "Monte do Carmo", "formação": "Economia", "estado": "TO", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Maiara Camara Chagas", "cidade": "Crisolia", "formação": "Economia", "estado": "MG", "país": "Brasil", "interesses": ["volleyball"] }
{"index": {}}
{"nome": "Maiara Carolina Silva Guinami", "cidade": "Paraguai", "formação": "Ciência da Computação", "estado": "MG", "país": "Brasil", "interesses": ["computação"] }
{"index": {}}
{"nome": "Maiara de Melo Souza", "cidade": "Brejo Novo", "formação": "Física", "estado": "BA", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Maiara Forte Pires de Camargo", "cidade": "Boa Ventura", "formação": "Ciências Sociais", "estado": "PB", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Maiara Marinho", "cidade": "Novo Horizonte", "formação": "Matemática", "estado": "MG", "país": "Brasil", "interesses": ["computação","artes"] }
{"index": {}}
{"nome": "Maiara Moreira Macario", "cidade": "Turvo", "formação": "Educação Física", "estado": "SC", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Maiara Oliveira Silva de Aguiar", "cidade": "Amarante do Maranhão", "formação": "História", "estado": "MA", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Maiara Prado Garcia Antonio", "cidade": "Iguape", "formação": "Música", "estado": "SP", "país": "Brasil", "interesses": ["física"] }
{"index": {}}
{"nome": "Maiara Zotelli", "cidade": "Santa Cruz da Estrela", "formação": "Ciência da Computação", "estado": "SP", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Maiby Cristine Prado", "cidade": "São Cristovão", "formação": "Economia", "estado": "PR", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Maici da Silva Barroso", "cidade": "Mirante do Piquiri", "formação": "Música", "estado": "PR", "país": "Brasil", "interesses": ["pintura","teatro"] }
{"index": {}}
{"nome": "Maick Meirelles Gonzaga", "cidade": "Santa Izabel do Oeste", "formação": "Educação Física", "estado": "PR", "país": "Brasil", "interesses": ["volleyball","basquete"] }
{"index": {}}
{"nome": "Maico Gouveia de Oliveira Freitas", "cidade": "Campo Verde", "formação": "História", "estado": "MT", "país": "Brasil", "interesses": ["society","volei"] }
{"index": {}}
{"nome": "Maicon Rabelo Guimaraes", "cidade": "Canoas", "formação": "Artes Cênicas", "estado": "RS", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Maicy Andrade dos Santos", "cidade": "Logradouro", "formação": "Educação Física", "estado": "PB", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Maila Mondl Von Metzen", "cidade": "Atibaiá", "formação": "Ciência da Computação", "estado": "SP", "país": "Brasil", "interesses": ["volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Maila Weber Mello", "cidade": "Santa Rosa de Lima", "formação": "Ciências Sociais", "estado": "SC", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "Mailla Mayume Domoto", "cidade": "Arnopolis", "formação": "Ciência da Computação", "estado": "SC", "país": "Brasil", "interesses": ["física"] }
{"index": {}}
{"nome": "Maily Loose Nickel", "cidade": "Santa Efigenia", "formação": "Matemática", "estado": "MG", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Maina Marques Belem Veiga", "cidade": "Jaguaruna", "formação": "Música", "estado": "SC", "país": "Brasil", "interesses": ["society","volei","voleibol"] }
{"index": {}}
{"nome": "Mainara Carolina Francelino", "cidade": "Zabele", "formação": "Artes Cênicas", "estado": "PB", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Mainara Prado Pereira Araujo", "cidade": "Tupiratins", "formação": "Música", "estado": "TO", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Maira Antonieta Oliveira Bianez", "cidade": "São Francisco do Maranhão", "formação": "Música", "estado": "MA", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Maira Carolina Pilao", "cidade": "Barra da Figueira", "formação": "Ciências Sociais", "estado": "MG", "país": "Brasil", "interesses": ["pintura"] }
{"index": {}}
{"nome": "Maira Carvalho Baldin", "cidade": "Eletra", "formação": "Educação Física", "estado": "RS", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Maira Cristina Tome Fonseca", "cidade": "Diamante de Uba", "formação": "Matemática", "estado": "MG", "país": "Brasil", "interesses": ["artes","pintura"] }
{"index": {}}
{"nome": "Maira de Freitas Bechtold", "cidade": "Frei Sebastião", "formação": "Ciência da Computação", "estado": "RS", "país": "Brasil", "interesses": ["volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Maira de Jesus Neves", "cidade": "Tabira", "formação": "Letras", "estado": "PE", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Maira Delomo Barretto", "cidade": "Ourizona", "formação": "Letras", "estado": "PR", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Maira Duran Baldissera", "cidade": "Cravolândia", "formação": "Música", "estado": "BA", "país": "Brasil", "interesses": ["volleyball"] }
{"index": {}}
{"nome": "Maira Gabriela Daolio Campanari", "cidade": "Elias Fausto", "formação": "Letras", "estado": "SP", "país": "Brasil", "interesses": ["física"] }
{"index": {}}
{"nome": "Maira Leme da Silva", "cidade": "Pouso Novo", "formação": "História", "estado": "RS", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Naara Canan de Franca", "cidade": "Cajuí", "formação": "Educação Física", "estado": "BA", "país": "Brasil", "interesses": ["society","volei","voleibol"] }
{"index": {}}
{"nome": "Nadhine Melo Pereira do Nascimento", "cidade": "Serranos", "formação": "Música", "estado": "MG", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Nadia Aparecida Macagnan da Silva", "cidade": "Bela Vista do Piaui", "formação": "Ciência da Computação", "estado": "PI", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Nadia Carvalho Gave", "cidade": "Rodeio Bonito", "formação": "Artes Cênicas", "estado": "RS", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Nadia Chen", "cidade": "Quincoe", "formação": "Ciências Sociais", "estado": "CE", "país": "Brasil", "interesses": ["society","volei"] }
{"index": {}}
{"nome": "Nadia Coelho Pontes", "cidade": "Catanduvas do Sul", "formação": "Educação Física", "estado": "PR", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Nadia Farah", "cidade": "Nova Aparecida", "formação": "Artes Cênicas", "estado": "SP", "país": "Brasil", "interesses": ["artes","pintura"] }
{"index": {}}
{"nome": "Nadia Fernanda da Silva de Souza", "cidade": "Piriquitos", "formação": "Educação Física", "estado": "PR", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Nadia Flavia Ponte", "cidade": "Bernardelli", "formação": "Artes Cênicas", "estado": "PR", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Nadia Gagliardi Khouri", "cidade": "Ipirá", "formação": "Estatística", "estado": "BA", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Nadia Jussara de Medeiros", "cidade": "Jamari", "formação": "Letras", "estado": "RO", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "Nadia Lara Muniz Manchini", "cidade": "Terra Branca", "formação": "Ciências Sociais", "estado": "MG", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Nadia Naomi Sato", "cidade": "Fortuna de Minas", "formação": "Ciência da Computação", "estado": "MG", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Nadia Sene Gibran", "cidade": "Cumuruxatiba", "formação": "História", "estado": "BA", "país": "Brasil", "interesses": ["computação"] }
{"index": {}}
{"nome": "Nadine Dias da Silva", "cidade": "Ponte Firme", "formação": "Ciências Sociais", "estado": "MG", "país": "Brasil", "interesses": ["matemática","física"] }
{"index": {}}
{"nome": "Nadine Gimenez de Assis", "cidade": "Itaunas", "formação": "Ciências Sociais", "estado": "ES", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Nadine Santana da Silva", "cidade": "Porto Estrela", "formação": "Letras", "estado": "MT", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "Nadja de Figueiredo Araujo", "cidade": "São Julião", "formação": "Letras", "estado": "PI", "país": "Brasil", "interesses": ["física","computação"] }
{"index": {}}
{"nome": "Nahan Telhe Silva", "cidade": "Jabora", "formação": "Economia", "estado": "SC", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Nahyan Tiego Pagliatto de Liz", "cidade": "Escada", "formação": "Economia", "estado": "PE", "país": "Brasil", "interesses": ["computação"] }
{"index": {}}
{"nome": "Naiade Regina Pinto", "cidade": "São Goncalo do Para", "formação": "Letras", "estado": "MG", "país": "Brasil", "interesses": ["volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Naiane Ayone Yanachi", "cidade": "Esperanca D'oeste", "formação": "Artes Cênicas", "estado": "SP", "país": "Brasil", "interesses": ["volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Naiara Coelho de Sousa", "cidade": "Missão Nova", "formação": "Ciências Sociais", "estado": "CE", "país": "Brasil", "interesses": ["computação","artes"] }
{"index": {}}
{"nome": "Naiara de Lima Moro", "cidade": "São Bento", "formação": "Ciência da Computação", "estado": "RS", "país": "Brasil", "interesses": ["teatro","música"] }
{"index": {}}
{"nome": "Naiara Hasegawa de Miranda", "cidade": "Sanga da Toca", "formação": "Matemática", "estado": "SC", "país": "Brasil", "interesses": ["voleibol","volleyball"] }
{"index": {}}
{"nome": "Naiara Lucia Rodrigues Bezerra", "cidade": "Torres", "formação": "Educação Física", "estado": "RS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Naiara Magalhaes Cardoso", "cidade": "Indiana", "formação": "Física", "estado": "SP", "país": "Brasil", "interesses": ["física","computação","artes"] }
{"index": {}}
{"nome": "Naiara Nunes Alves", "cidade": "Catalão", "formação": "Educação Física", "estado": "GO", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Naike Barao", "cidade": "São Francisco", "formação": "Música", "estado": "SP", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Naila Mendonca da Silva", "cidade": "Divisa Alegre", "formação": "Música", "estado": "MG", "país": "Brasil", "interesses": ["computação"] }
{"index": {}}
{"nome": "Naila Osti Caldeira", "cidade": "Juacema", "formação": "Economia", "estado": "BA", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Naila Rodrigues Souza", "cidade": "Guaranta do Norte", "formação": "Física", "estado": "MT", "país": "Brasil", "interesses": ["volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Nailanita Prette", "cidade": "Barra", "formação": "Artes Cênicas", "estado": "CE", "país": "Brasil", "interesses": ["volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Nailson Rodrigo dos Santos", "cidade": "São José do Belmonte", "formação": "Ciências Sociais", "estado": "PE", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Nailton Sousa Silva Filho", "cidade": "Entre Rios do Oeste", "formação": "Ciências Sociais", "estado": "PR", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Naimara Lucia Andrigo", "cidade": "Campolândia", "formação": "Física", "estado": "GO", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Naimy Boutros Garcia", "cidade": "Firmamento", "formação": "Física", "estado": "RN", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Naira Lie Alves da Silva", "cidade": "Marilac", "formação": "Letras", "estado": "MG", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Naira Maia Costa", "cidade": "Assunção do Piaui", "formação": "Ciências Sociais", "estado": "PI", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Nairim Liz Bernardo Marques", "cidade": "Quitaius", "formação": "Física", "estado": "CE", "país": "Brasil", "interesses": ["basquete","matemática","física"] }
{"index": {}}
{"nome": "Naisa Neves", "cidade": "Virmond", "formação": "Ciência da Computação", "estado": "PR", "país": "Brasil", "interesses": ["basquete","matemática","física"] }
{"index": {}}
{"nome": "Naitiely Taylana da Costa", "cidade": "Mutambeiras", "formação": "Estatística", "estado": "CE", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Najla Ferreira Rodrigues", "cidade": "Heliopolis", "formação": "Ciências Sociais", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Najla Varela Santiago", "cidade": "Nossa Senhora Aparecida", "formação": "História", "estado": "RS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Najua Abou Arabi Silveira", "cidade": "Formoso", "formação": "Artes Cênicas", "estado": "MG", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "Nalim Pereira Granzotto", "cidade": "Vila Gandhi", "formação": "Letras", "estado": "PR", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Naliny Milena da Silva", "cidade": "Caieiras", "formação": "Educação Física", "estado": "SP", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Nalva Maria Rodrigues", "cidade": "Cacimba de Areia", "formação": "Letras", "estado": "PB", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Namy Shiromoto", "cidade": "Marilândia", "formação": "Educação Física", "estado": "ES", "país": "Brasil", "interesses": ["basquete","matemática","física"] }
{"index": {}}
{"nome": "Nanci Adela Kirinus", "cidade": "Benfica", "formação": "Economia", "estado": "PA", "país": "Brasil", "interesses": ["pintura","teatro"] }
{"index": {}}
{"nome": "Naomi Alessandra Takeuchi da Silva", "cidade": "Santa Salete", "formação": "Artes Cênicas", "estado": "SP", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Obadias Oliveira do Carmo Filho", "cidade": "Palma Sola", "formação": "Física", "estado": "SC", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Ocimar Henrique Campos Lucas", "cidade": "Rio da Anta", "formação": "História", "estado": "SC", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Octavio Amado Gaspar", "cidade": "Itapeva", "formação": "História", "estado": "SP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Octavio Augusto de Souza de Albuquelque", "cidade": "Bom Conselho", "formação": "História", "estado": "PE", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Octavio Carneiro dos Santos", "cidade": "Mariana Pimentel", "formação": "Matemática", "estado": "RS", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Octavio de Oliveira Izzi", "cidade": "Esquina Araujo", "formação": "Estatística", "estado": "RS", "país": "Brasil", "interesses": ["voleibol","volleyball"] }
{"index": {}}
{"nome": "Octavio Gusmao de Almeida E Oliveira", "cidade": "Santo Antonio", "formação": "Música", "estado": "AL", "país": "Brasil", "interesses": ["física","computação","artes"] }
{"index": {}}
{"nome": "Octavio Henrique Bertolucci", "cidade": "Carmo da Cachoeira", "formação": "Ciências Sociais", "estado": "MG", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Octavio Mathias Silva", "cidade": "Penedo", "formação": "Artes Cênicas", "estado": "AL", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Octavio Pennella Fenelon Costa", "cidade": "Água Fria", "formação": "Economia", "estado": "PA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Octavio Salim Moreira", "cidade": "Duas Barras", "formação": "Matemática", "estado": "ES", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Odacir Burjato Neto", "cidade": "Emboguacu", "formação": "Matemática", "estado": "PR", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Odelio Porto Junior", "cidade": "Águas Formosas", "formação": "História", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Odier Tadashi Sato de Araujo", "cidade": "Quincoe", "formação": "Ciências Sociais", "estado": "CE", "país": "Brasil", "interesses": ["voleibol","volleyball"] }
{"index": {}}
{"nome": "Ohana Araujo Pereira Meira Pinto", "cidade": "Taquaracu de Minas", "formação": "Artes Cênicas", "estado": "MG", "país": "Brasil", "interesses": ["música"] }
{"index": {}}
{"nome": "Ohanna Jade do Amaral", "cidade": "Itaipava do Grajau", "formação": "Estatística", "estado": "MA", "país": "Brasil", "interesses": ["volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Olavo Asano", "cidade": "Picinguaba", "formação": "Ciência da Computação", "estado": "SP", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Olavo Costa Candolo", "cidade": "Alto Maranhão", "formação": "Física", "estado": "MG", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Olavo Panseri Ferreira", "cidade": "Tambauzinho", "formação": "Estatística", "estado": "PB", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Olavo Silva Bueno Franco", "cidade": "Equador", "formação": "Física", "estado": "RN", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Olavo Tozete Tercini", "cidade": "Cirilândia", "formação": "Música", "estado": "GO", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Olavo Yuiti Niiyama", "cidade": "João Neiva", "formação": "Economia", "estado": "ES", "país": "Brasil", "interesses": ["basquete"] }
{"index": {}}
{"nome": "Oleg Olegovich Balev", "cidade": "Mundo Novo", "formação": "Educação Física", "estado": "BA", "país": "Brasil", "interesses": ["volleyball","basquete"] }
{"index": {}}
{"nome": "Olga Cristina Bagatini Ribeiro", "cidade": "Paranapiacaba", "formação": "Artes Cênicas", "estado": "SP", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Olga Dayane Holanda Lima", "cidade": "Lajeado Grande", "formação": "Economia", "estado": "RS", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Olga Lucia Larrota Cordoba", "cidade": "Atafona", "formação": "Ciência da Computação", "estado": "RS", "país": "Brasil", "interesses": ["física"] }
{"index": {}}
{"nome": "Olgata Marianne Rodrigues G da Silva", "cidade": "Caraiba", "formação": "Física", "estado": "PE", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Oliver Clerici Laviaguerre", "cidade": "Rio da Luz", "formação": "Música", "estado": "SC", "país": "Brasil", "interesses": ["voleibol","volleyball"] }
{"index": {}}
{"nome": "Oliver Fonseca Fujimori", "cidade": "Porto Maua", "formação": "Ciência da Computação", "estado": "RS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Oliver Penner", "cidade": "Santa Maria", "formação": "Artes Cênicas", "estado": "AP", "país": "Brasil", "interesses": ["música"] }
{"index": {}}
{"nome": "Oliver Wesley dos Santos Silva", "cidade": "Rio Muqui", "formação": "Ciência da Computação", "estado": "ES", "país": "Brasil", "interesses": ["society","volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Olivia Alves Opipari", "cidade": "Vinte E Cinco de Julho", "formação": "Estatística", "estado": "ES", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Olivia Baldresca Monaco", "cidade": "Acegua", "formação": "Física", "estado": "RS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Olivia Cadelca", "cidade": "Ponto do Marambaiá", "formação": "Física", "estado": "MG", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Olivia Costa Amorim", "cidade": "Espigao Alto", "formação": "Ciências Sociais", "estado": "RS", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Olivia Januzzi Zequi", "cidade": "Barra de Santana", "formação": "Ciência da Computação", "estado": "PB", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Olivia Lagua de Oliveira B Fernandes", "cidade": "Chã Preta", "formação": "Matemática", "estado": "AL", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Olivia Marion Erra Panhoca", "cidade": "Vila Bender", "formação": "Artes Cênicas", "estado": "RS", "país": "Brasil", "interesses": ["matemática","física"] }
{"index": {}}
{"nome": "Olivia Sanches", "cidade": "Mirandopolis", "formação": "Artes Cênicas", "estado": "SP", "país": "Brasil", "interesses": ["basquete","matemática","física"] }
{"index": {}}
{"nome": "Olivia Santana Jorge", "cidade": "Fortaleza", "formação": "Educação Física", "estado": "CE", "país": "Brasil", "interesses": ["basquete","matemática","física"] }
{"index": {}}
{"nome": "Olivia Silva Evangelista", "cidade": "Cerro do Martins", "formação": "Letras", "estado": "RS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Olivia Silva Zanetti", "cidade": "Varzea Grande", "formação": "História", "estado": "MT", "país": "Brasil", "interesses": ["pintura"] }
{"index": {}}
{"nome": "Olivia Takeuchi Stefanovits", "cidade": "Fazenda de Cima", "formação": "Artes Cênicas", "estado": "MT", "país": "Brasil", "interesses": ["artes","pintura"] }
{"index": {}}
{"nome": "Olivia Tameirao Seixas", "cidade": "Valinhos", "formação": "Artes Cênicas", "estado": "SP", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Olivia Teixeira", "cidade": "Pires Belo", "formação": "Educação Física", "estado": "GO", "país": "Brasil", "interesses": ["música"] }
{"index": {}}
{"nome": "Olivio Sperchi Neto", "cidade": "Aranau", "formação": "Música", "estado": "CE", "país": "Brasil", "interesses": ["artes","pintura"] }
{"index": {}}
{"nome": "Oluwaseyi Ayomide Abidemi Longe", "cidade": "Lagarto", "formação": "Educação Física", "estado": "SE", "país": "Brasil", "interesses": ["artes","pintura"] }
{"index": {}}
{"nome": "Omar Chamon", "cidade": "Taio", "formação": "Música", "estado": "SC", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Omar Freddi", "cidade": "Cassilândia", "formação": "Matemática", "estado": "MS", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Omkar Rafael Nityanand Canton Gonzalez", "cidade": "Gamadinho", "formação": "Artes Cênicas", "estado": "PR", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Onaides Roberto da Silva Junior", "cidade": "Hulha Negra", "formação": "Ciência da Computação", "estado": "RS", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Pablo de Azevedo Santos", "cidade": "Baixa da Onça", "formação": "Ciências Sociais", "estado": "AL", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Pablo Eric Toledo Majer", "cidade": "Gaspar", "formação": "História", "estado": "AL", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Pablo Fernandes Martinez", "cidade": "Araucaria", "formação": "Ciências Sociais", "estado": "PR", "país": "Brasil", "interesses": ["volei","voleibol"] }
{"index": {}}
{"nome": "Pablo Gabriel Santos Dias", "cidade": "Barra do Chapeu", "formação": "Educação Física", "estado": "SP", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Pablo Henrique Brito da Rosa", "cidade": "Pauini", "formação": "Música", "estado": "AM", "país": "Brasil", "interesses": ["volei"] }
{"index": {}}
{"nome": "Pablo Libano Rodrigues", "cidade": "Herciliopolis", "formação": "Economia", "estado": "SC", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Pablo Luiz Martins Teles", "cidade": "Cachoeirinha de Itauna", "formação": "Física", "estado": "ES", "país": "Brasil", "interesses": ["física","computação","artes"] }
{"index": {}}
{"nome": "Pablo Nascimento", "cidade": "Esquina Ipiranga", "formação": "Educação Física", "estado": "RS", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Pablo Ramon Cardozo Sivila", "cidade": "Albuquerque", "formação": "Ciência da Computação", "estado": "MS", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Pablo Rodrigo Andrade da Silva", "cidade": "São João Batista do Gloria", "formação": "Música", "estado": "MG", "país": "Brasil", "interesses": ["volleyball"] }
{"index": {}}
{"nome": "Pablo Rubinstein", "cidade": "Pau D'alho Do Sul", "formação": "Ciências Sociais", "estado": "PR", "país": "Brasil", "interesses": ["artes","pintura"] }
{"index": {}}
{"nome": "Pablo Simao dos Ouros", "cidade": "Barrolândia", "formação": "Música", "estado": "TO", "país": "Brasil", "interesses": ["voleibol","volleyball"] }
{"index": {}}
{"nome": "Pablo Souza Sala Oliveira", "cidade": "Guarda-mor", "formação": "Economia", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Palmira Sara Aranovich Florentino", "cidade": "Igarapava", "formação": "Música", "estado": "SP", "país": "Brasil", "interesses": ["volei"] }
{"index": {}}
{"nome": "Paloma Barreiro de Andrade", "cidade": "Campo Belo", "formação": "Matemática", "estado": "MG", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Paloma Belo", "cidade": "Agostinho", "formação": "Ciências Sociais", "estado": "PR", "país": "Brasil", "interesses": ["society","volei","voleibol"] }
{"index": {}}
{"nome": "Paloma Campos Caldardo Brito", "cidade": "Cravolândia", "formação": "Economia", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Paloma Casanovas Reis", "cidade": "Anhandui", "formação": "Matemática", "estado": "MS", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Paloma Cristina Braga", "cidade": "Nanuque", "formação": "Matemática", "estado": "MG", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Paloma Cristina de Queiroz", "cidade": "Miracema", "formação": "Física", "estado": "RJ", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "Paloma Cristina Lima dos Santos", "cidade": "Juquitiba", "formação": "Música", "estado": "SP", "país": "Brasil", "interesses": ["volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Paloma Crociati", "cidade": "Corguinho", "formação": "Educação Física", "estado": "MS", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Paloma Cunha Ferraz", "cidade": "Barra do Ouro", "formação": "Ciência da Computação", "estado": "TO", "país": "Brasil", "interesses": ["volei"] }
{"index": {}}
{"nome": "Paloma de Melo Assuncao", "cidade": "Campanario", "formação": "Estatística", "estado": "MG", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Paloma de Souza Alves", "cidade": "Capixaba", "formação": "Letras", "estado": "AC", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Paloma Gallegos Alvarenga", "cidade": "Altolândia", "formação": "Letras", "estado": "MG", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Paloma Gomes Branco", "cidade": "São Timóteo", "formação": "Educação Física", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Paloma Leite Marcondes de Oliveira", "cidade": "Iraguacu", "formação": "Economia", "estado": "PE", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Paloma Lopes de Sousa", "cidade": "Boca do Córrego", "formação": "Educação Física", "estado": "BA", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Paloma Magalhaes da Rocha", "cidade": "Paratibe", "formação": "Economia", "estado": "PE", "país": "Brasil", "interesses": ["volei","voleibol"] }
{"index": {}}
{"nome": "Paloma Mendonca Duarte Pinto", "cidade": "Rio das Pedras", "formação": "Artes Cênicas", "estado": "SP", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Paloma Natalia Ortelan Miranda", "cidade": "Ipuiuna", "formação": "Música", "estado": "MG", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Paloma Nunes dos Santos", "cidade": "Entrepelado", "formação": "Ciências Sociais", "estado": "RS", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Paloma Oliveira da Silva Costa", "cidade": "São Domingos", "formação": "Economia", "estado": "PE", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "Paloma Pettenazzi Napolitano", "cidade": "Antonio Martins", "formação": "Educação Física", "estado": "RN", "país": "Brasil", "interesses": ["música"] }
{"index": {}}
{"nome": "Paloma Promenzio de Lorenso", "cidade": "Nova Guarita", "formação": "Física", "estado": "SC", "país": "Brasil", "interesses": ["volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Paloma Regina de Castro", "cidade": "Mogiquicaba", "formação": "Letras", "estado": "BA", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Paloma Rodrigues Pinheiro", "cidade": "Conquista", "formação": "Economia", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Paloma Smanioto Garcia", "cidade": "Carmo da Cachoeira", "formação": "Letras", "estado": "MG", "país": "Brasil", "interesses": ["matemática","física"] }
{"index": {}}
{"nome": "Pamela Alves de Sao Pedro", "cidade": "Roque", "formação": "Ciência da Computação", "estado": "MA", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Pamela Ankosqui Napolitano", "cidade": "Santa Cruz da Esperanca", "formação": "Artes Cênicas", "estado": "SP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Pamela Ayumi Izumida Ueda", "cidade": "Cruzeiro", "formação": "Estatística", "estado": "DF", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Pamela Biazoli Suzuki", "cidade": "Conceição da Boa Vista", "formação": "Estatística", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Pamela Blinofi Garcia", "cidade": "Serra dos Gregorios", "formação": "Física", "estado": "RS", "país": "Brasil", "interesses": ["basquete"] }
{"index": {}}
{"nome": "Pamela Bosche Vasconcerva", "cidade": "Prata", "formação": "Ciências Sociais", "estado": "CE", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Pamela Carla Gomes da Silva", "cidade": "Felicio dos Santos", "formação": "Ciências Sociais", "estado": "MG", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Pamela Carlota Camargo Alves", "cidade": "Taquara", "formação": "Educação Física", "estado": "RS", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Pamela Coca dos Santos Ramos", "cidade": "Rodrigues Nascimento", "formação": "Economia", "estado": "GO", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Pamela Costa Carvalho", "cidade": "Campos Novos Paulista", "formação": "Economia", "estado": "SP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Pamela Cristina Avanco", "cidade": "Novo Horizonte do Sul", "formação": "Matemática", "estado": "MS", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Pamela Cristina Cavalcanti dos Santos", "cidade": "Caceres", "formação": "Ciências Sociais", "estado": "MT", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Rachel Beatriz Aloma Vieira", "cidade": "São Paulo das Missoes", "formação": "Artes Cênicas", "estado": "RS", "país": "Brasil", "interesses": ["pintura"] }
{"index": {}}
{"nome": "Rachel Befi Goulart", "cidade": "Lagoa do Bauzinho", "formação": "Ciência da Computação", "estado": "GO", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Rachel Carvalho Carmona", "cidade": "Vila dos Cabanos", "formação": "Ciência da Computação", "estado": "PA", "país": "Brasil", "interesses": ["teatro","música"] }
{"index": {}}
{"nome": "Rachel Carvalho Goncalves", "cidade": "Francisco Santos", "formação": "Matemática", "estado": "PI", "país": "Brasil", "interesses": ["society","volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Rachel Geraldo Szszudlowski", "cidade": "Encruzilhada", "formação": "Ciências Sociais", "estado": "RS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Rachel Lasman Salama", "cidade": "Panema", "formação": "Economia", "estado": "PR", "país": "Brasil", "interesses": ["música"] }
{"index": {}}
{"nome": "Rachel Momente Miquelin", "cidade": "Maita", "formação": "Ciências Sociais", "estado": "PR", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Rachel Nogueira Vicentini Faleiros", "cidade": "Piracanjuba", "formação": "Matemática", "estado": "GO", "país": "Brasil", "interesses": ["teatro","música"] }
{"index": {}}
{"nome": "Rachel Omoto Gabriel", "cidade": "Caporanga", "formação": "Letras", "estado": "SP", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Rachel Siqueira Filogonio", "cidade": "Pedra Bonita", "formação": "Economia", "estado": "MG", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Rachel Sordi Relvas", "cidade": "Mucuri", "formação": "Ciência da Computação", "estado": "BA", "país": "Brasil", "interesses": ["society","volei","voleibol"] }
{"index": {}}
{"nome": "Rachel Tomas dos Santos Abrao", "cidade": "São João Marcos", "formação": "Matemática", "estado": "RJ", "país": "Brasil", "interesses": ["society","volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Rachiri Aguiar Costa", "cidade": "Belo Oriente", "formação": "Letras", "estado": "MG", "país": "Brasil", "interesses": ["volei","voleibol"] }
{"index": {}}
{"nome": "Raely Neves dos Santos", "cidade": "Igaci", "formação": "Física", "estado": "AL", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Rafael Abbud", "cidade": "Craíbas", "formação": "Estatística", "estado": "AL", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Rafael Acciari", "cidade": "Nordestina", "formação": "Ciências Sociais", "estado": "PR", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Rafael Acquaviva Araujo", "cidade": "São Luiz", "formação": "Ciência da Computação", "estado": "RS", "país": "Brasil", "interesses": ["futebol"] }
{"index": {}}
{"nome": "Rafael Ageu Franklin de Freitas", "cidade": "Aracaju", "formação": "Educação Física", "estado": "SE", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Rafael Ajudarte de Campos", "cidade": "Pinheiro", "formação": "Letras", "estado": "PR", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Rafael Akihiro Matumoto", "cidade": "Boa Esperanca", "formação": "Música", "estado": "RJ", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Rafael Akimitsu Kawamorita", "cidade": "São Miguel", "formação": "Estatística", "estado": "RS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Rafael Akira Matsunaga", "cidade": "Lagoa da Canoa", "formação": "Letras", "estado": "AL", "país": "Brasil", "interesses": ["volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Rafael Albuquerque dos Santos", "cidade": "Itanhém", "formação": "Ciências Sociais", "estado": "BA", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Rafael Alcalde Tegon de Souza", "cidade": "Saltinho do Oeste", "formação": "Matemática", "estado": "PR", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "Rafael Aleixo", "cidade": "Lagoa Funda", "formação": "Educação Física", "estado": "SE", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Rafael Almeida Stedile", "cidade": "Gravata do Ibiapina", "formação": "Estatística", "estado": "PE", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Rafael Almeida Torrezani", "cidade": "Salto da Divisa", "formação": "Ciências Sociais", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Rafael Alves Albuquerque", "cidade": "Bandeirante", "formação": "História", "estado": "SC", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Rafael Alves de Figueiredo", "cidade": "Santa Clara", "formação": "Música", "estado": "PR", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Rafael Alves de Souza", "cidade": "Botumirim", "formação": "Estatística", "estado": "MG", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Rafael Alves Deutner", "cidade": "Belisario", "formação": "Estatística", "estado": "MG", "país": "Brasil", "interesses": ["basquete","matemática","física"] }
{"index": {}}
{"nome": "Rafael Alves Lourenco", "cidade": "São Carlos", "formação": "Ciência da Computação", "estado": "RS", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Rafael Alves Lucena Gomes", "cidade": "Riacho Pequeno", "formação": "Física", "estado": "PE", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Rafael Amador Vilhena Celeste", "cidade": "Pontinopolis", "formação": "Ciência da Computação", "estado": "MT", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Rafael Amancio Diegues", "cidade": "Guimarania", "formação": "Ciência da Computação", "estado": "MG", "país": "Brasil", "interesses": ["música"] }
{"index": {}}
{"nome": "Rafael Amaro Rolfsen", "cidade": "Tartaruga", "formação": "Ciências Sociais", "estado": "BA", "país": "Brasil", "interesses": ["matemática","física"] }
{"index": {}}
{"nome": "Rafael Americo Sartori", "cidade": "Saldanha", "formação": "Artes Cênicas", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Rafael Andrade de Almeida", "cidade": "Ariranha", "formação": "Física", "estado": "SP", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Rafael Angelo Goncalves Smirne", "cidade": "Itaguaru", "formação": "Matemática", "estado": "GO", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Rafael Antonio Alves Leite", "cidade": "Varginha", "formação": "Artes Cênicas", "estado": "MT", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Rafael Antonio Moutinho", "cidade": "Feira Nova", "formação": "Letras", "estado": "SE", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Rafael Antonio Nascimento Cruz", "cidade": "Bandeira", "formação": "Matemática", "estado": "MG", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Rafael Antonio Teixeira Malta", "cidade": "Massaranduba", "formação": "História", "estado": "AL", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Rafael Antunes Ferreira", "cidade": "Pontalete", "formação": "Educação Física", "estado": "MG", "país": "Brasil", "interesses": ["society","volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Rafael Antunes Inhasz", "cidade": "Tupiratins", "formação": "Letras", "estado": "TO", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Rafael Aparecido Martins Frade", "cidade": "Fartura", "formação": "Ciência da Computação", "estado": "ES", "país": "Brasil", "interesses": ["volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Rafael Aragao Rocha Faria", "cidade": "São Miguel dos Milagres", "formação": "Artes Cênicas", "estado": "AL", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Rafael Araujo Borges da Silva", "cidade": "Jândiai", "formação": "Artes Cênicas", "estado": "PA", "país": "Brasil", "interesses": ["basquete"] }
{"index": {}}
{"nome": "Rafael Araujo Nuncio", "cidade": "Itapetim", "formação": "Matemática", "estado": "PE", "país": "Brasil", "interesses": ["society"] }
{"index": {}}
{"nome": "Rafael Armando Lourenco", "cidade": "São Sebastião do Tocantins", "formação": "Educação Física", "estado": "TO", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Rafael Arrais Leite", "cidade": "Jardinopolis", "formação": "História", "estado": "SP", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Sabine Piller Teles", "cidade": "David Canabarro", "formação": "Letras", "estado": "RS", "país": "Brasil", "interesses": ["artes","pintura"] }
{"index": {}}
{"nome": "Sabrina Alves Barbosa", "cidade": "Ibipora", "formação": "Música", "estado": "PR", "país": "Brasil", "interesses": ["física"] }
{"index": {}}
{"nome": "Sabrina Alves dos Reis", "cidade": "Brejinho de Nazaré", "formação": "Artes Cênicas", "estado": "TO", "país": "Brasil", "interesses": ["artes","pintura"] }
{"index": {}}
{"nome": "Sabrina Alves Santos", "cidade": "Costas", "formação": "Letras", "estado": "MG", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Sabrina Antonagi Caparros", "cidade": "Cachoeiras de Macacu", "formação": "Matemática", "estado": "RJ", "país": "Brasil", "interesses": ["basquete"] }
{"index": {}}
{"nome": "Sabrina Aparecida Silva Martns", "cidade": "Armazem", "formação": "Educação Física", "estado": "SC", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Sabrina Brandao de Araujo", "cidade": "Limoeiro de Anadia", "formação": "História", "estado": "AL", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "Sabrina Carolina de Souza", "cidade": "Sanga Puita", "formação": "Estatística", "estado": "MS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Sabrina Carolina Ferreira", "cidade": "Três Barras do Parana", "formação": "Economia", "estado": "PR", "país": "Brasil", "interesses": ["física"] }
{"index": {}}
{"nome": "Sabrina Costa Sala", "cidade": "Lapela", "formação": "Artes Cênicas", "estado": "MA", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Sabrina de Almeida Guimaraes", "cidade": "Vila Flores", "formação": "Ciências Sociais", "estado": "RS", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Sabrina de Castro Gofert", "cidade": "Perdigão", "formação": "Ciências Sociais", "estado": "MG", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Sabrina de Franca Vilaca", "cidade": "Angra dos Reis", "formação": "Matemática", "estado": "RJ", "país": "Brasil", "interesses": ["física","computação"] }
{"index": {}}
{"nome": "Sabrina de Oliveira Mendes", "cidade": "Riachão", "formação": "Matemática", "estado": "MA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Sabrina Dias Andrade", "cidade": "Santo Antonio", "formação": "Matemática", "estado": "RS", "país": "Brasil", "interesses": ["basquete","matemática","física"] }
{"index": {}}
{"nome": "Sabrina Dotta Noschang", "cidade": "Otelo", "formação": "Artes Cênicas", "estado": "PA", "país": "Brasil", "interesses": ["voleibol","volleyball"] }
{"index": {}}
{"nome": "Sabrina Escamilha Coelho", "cidade": "Lagoa D'anta", "formação": "Matemática", "estado": "RN", "país": "Brasil", "interesses": ["física","computação"] }
{"index": {}}
{"nome": "Sabrina Faceroli Tridico", "cidade": "Santa Fé do Araguaiá", "formação": "Física", "estado": "TO", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Sabrina Goncalves Cardoso", "cidade": "Bairro Limoeiro", "formação": "Ciências Sociais", "estado": "PR", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Sabrina Lara Catharino", "cidade": "Itororo do Paranapanema", "formação": "História", "estado": "SP", "país": "Brasil", "interesses": ["computação","artes"] }
{"index": {}}
{"nome": "Sabrina Liberato Jacinto", "cidade": "Comodoro", "formação": "História", "estado": "MT", "país": "Brasil", "interesses": ["volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Sabrina Lima Magalhaes", "cidade": "Atalaiá", "formação": "Economia", "estado": "AL", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Sabrina Luiz Delgado", "cidade": "Santa Cruz da Esperanca", "formação": "Letras", "estado": "SP", "país": "Brasil", "interesses": ["society"] }
{"index": {}}
{"nome": "Sabrina Luiza Rabelo", "cidade": "Vila Seca", "formação": "Matemática", "estado": "RS", "país": "Brasil", "interesses": ["pintura","teatro"] }
{"index": {}}
{"nome": "Sabrina Maluf Labate", "cidade": "Perpetuo Socorro", "formação": "Estatística", "estado": "MG", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Sabrina Martins Reigota", "cidade": "Novo Diamantino", "formação": "História", "estado": "MT", "país": "Brasil", "interesses": ["computação"] }
{"index": {}}
{"nome": "Sabrina Melo Del Sarto", "cidade": "Maiquinique", "formação": "História", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Sabrina Pereira Ferro", "cidade": "Itapé", "formação": "Física", "estado": "BA", "país": "Brasil", "interesses": ["computação","artes"] }
{"index": {}}
{"nome": "Sabrina Ribeiro Santana", "cidade": "Pontalina", "formação": "Economia", "estado": "GO", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Sabrina Rosiene da Silva", "cidade": "Cachoeira", "formação": "Ciência da Computação", "estado": "BA", "país": "Brasil", "interesses": ["society","volei"] }
{"index": {}}
{"nome": "Sabrina Salgado de Almeida", "cidade": "São José do Vale do Rio Preto", "formação": "Educação Física", "estado": "RJ", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Sabrina Santos de Souza", "cidade": "Ibipetum", "formação": "Ciência da Computação", "estado": "BA", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Sabrina Silva Viana", "cidade": "Caxingo", "formação": "Artes Cênicas", "estado": "PI", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Sabrina Sousa Xavier", "cidade": "Bentivi", "formação": "Física", "estado": "PE", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Sabrina Souza Mariano", "cidade": "Santana do Sobrado", "formação": "Música", "estado": "BA", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Sabrina Straatmann", "cidade": "General Camara", "formação": "Estatística", "estado": "RS", "país": "Brasil", "interesses": ["volleyball","basquete"] }
{"index": {}}
{"nome": "Sabrina Tigre de Ribamar", "cidade": "Boa Vista", "formação": "Ciência da Computação", "estado": "MT", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Sabrina Vechini Gouvea", "cidade": "Brazabrantes", "formação": "Estatística", "estado": "GO", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Sabryne Rodrigues dos Santos", "cidade": "São Pedro da Serra", "formação": "Ciência da Computação", "estado": "RS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Sade Oliveira", "cidade": "Barra do Bonifácio", "formação": "Artes Cênicas", "estado": "AL", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Safira Hee Sook Lee", "cidade": "Boninal", "formação": "Ciência da Computação", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Safire Torres Santos da Silva", "cidade": "Campanário", "formação": "Matemática", "estado": "CE", "país": "Brasil", "interesses": ["pintura","teatro"] }
{"index": {}}
{"nome": "Saki Okatani", "cidade": "Boa União", "formação": "Ciências Sociais", "estado": "MT", "país": "Brasil", "interesses": ["pintura","teatro"] }
{"index": {}}
{"nome": "Salete Pereira da Silva", "cidade": "Bom Sucesso do Sul", "formação": "Ciências Sociais", "estado": "PR", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Salomao Viana Ribeiro", "cidade": "Caita", "formação": "Matemática", "estado": "PR", "país": "Brasil", "interesses": ["física","computação","artes"] }
{"index": {}}
{"nome": "Samanta Esteves Nagem", "cidade": "Pedro Velho", "formação": "Estatística", "estado": "RN", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Samanta Nunes de Arruda", "cidade": "Rio do Braco", "formação": "História", "estado": "BA", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Samanta Santos Felix", "cidade": "Ipiaú", "formação": "Artes Cênicas", "estado": "BA", "país": "Brasil", "interesses": ["música"] }
{"index": {}}
{"nome": "Samanta Tavares Barbosa da Silva", "cidade": "Lagoa do Sitio", "formação": "História", "estado": "PI", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Samantha Avelino Borgonovi", "cidade": "São Gabriel da Cachoeira", "formação": "Estatística", "estado": "AM", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Samantha de Sa Lojor", "cidade": "Barra Feliz", "formação": "Educação Física", "estado": "MG", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Tabata Chauanda da Silva", "cidade": "Brasileia", "formação": "Estatística", "estado": "AC", "país": "Brasil", "interesses": ["basquete","matemática","física","computação"] }
{"index": {}}
{"nome": "Tabata de Aquino Linnhoff Vianna", "cidade": "Novilhona", "formação": "Estatística", "estado": "MG", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }
{"index": {}}
{"nome": "Tabata Dorta Farias", "cidade": "Pirabeiraba", "formação": "Letras", "estado": "SC", "país": "Brasil", "interesses": ["society"] }
{"index": {}}
{"nome": "Tabata Fronza Ferreira Martins", "cidade": "Messejana", "formação": "Letras", "estado": "CE", "país": "Brasil", "interesses": ["música"] }
{"index": {}}
{"nome": "Tabata Galan dos Santos", "cidade": "Oasis", "formação": "Física", "estado": "SP", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Tabata Porcelani Kakazu", "cidade": "São Sebastião do Sul", "formação": "Ciências Sociais", "estado": "SC", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Tabata Rodrigues Miguel", "cidade": "Cumaru", "formação": "Música", "estado": "PE", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Taciana Carnauba de Oliveira", "cidade": "Mariopolis", "formação": "Música", "estado": "PR", "país": "Brasil", "interesses": ["society","volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Taciana Carreira de Aquino", "cidade": "Ascurra", "formação": "História", "estado": "SC", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Taciana Chen", "cidade": "São Sebastião", "formação": "Letras", "estado": "PR", "país": "Brasil", "interesses": ["volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Taciana Gava de Menezes", "cidade": "Cariri do Tocantins", "formação": "Música", "estado": "TO", "país": "Brasil", "interesses": ["música"] }
{"index": {}}
{"nome": "Taciani Lara Molina Lopes", "cidade": "Maximiliano de Almeida", "formação": "Matemática", "estado": "RS", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Taciano Karam Siqueira Nasr", "cidade": "Celina", "formação": "Matemática", "estado": "ES", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Tacilio Moreira de Araujo", "cidade": "Barbosa Ferraz", "formação": "História", "estado": "PR", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Tacio Soares Rodrigues", "cidade": "Serra Bonita", "formação": "Física", "estado": "MG", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Tadeu da Costa Oliveira Junior", "cidade": "Itarana", "formação": "Estatística", "estado": "ES", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Tadeu Martines", "cidade": "Tejuco", "formação": "Ciência da Computação", "estado": "MG", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Tadeu Raimundo de Oliveira", "cidade": "Guapiranga", "formação": "Física", "estado": "SP", "país": "Brasil", "interesses": ["volei"] }
{"index": {}}
{"nome": "Tafarel Yan", "cidade": "Coronel João Pessoa", "formação": "História", "estado": "RN", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Taiane Augustinho Souza", "cidade": "Nordestina", "formação": "Estatística", "estado": "PR", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Taiane Brandao dos Santos", "cidade": "Pequia", "formação": "Artes Cênicas", "estado": "ES", "país": "Brasil", "interesses": ["física","computação"] }
{"index": {}}
{"nome": "Taiane Ribeiro da Silva", "cidade": "São Pedro da Serra", "formação": "Letras", "estado": "RS", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Taicy Sigaki dos Santos", "cidade": "Passira", "formação": "Artes Cênicas", "estado": "PE", "país": "Brasil", "interesses": ["física","computação","artes"] }
{"index": {}}
{"nome": "Taieny Seraphim de Moura", "cidade": "Delfino", "formação": "Ciência da Computação", "estado": "BA", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Taiguara Caninde Rodrigues Silva", "cidade": "Lucrecia", "formação": "Educação Física", "estado": "RN", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Taila Ribeiro de Moura", "cidade": "Vicentinopolis", "formação": "Estatística", "estado": "GO", "país": "Brasil", "interesses": ["volleyball","basquete"] }
{"index": {}}
{"nome": "Taila Virgine Costa", "cidade": "Canaa", "formação": "História", "estado": "PE", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Tailane Machado Santos", "cidade": "Custodia", "formação": "Estatística", "estado": "PE", "país": "Brasil", "interesses": ["teatro","música"] }
{"index": {}}
{"nome": "Taina Abrao Venturini Salamao", "cidade": "Presidente Jânio Quadros", "formação": "Estatística", "estado": "BA", "país": "Brasil", "interesses": ["volei","voleibol"] }
{"index": {}}
{"nome": "Taina Caroline dos Reis", "cidade": "Sete Pontes", "formação": "História", "estado": "RJ", "país": "Brasil", "interesses": ["volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Taina Caroline Lucena dos Santos", "cidade": "Riolândia", "formação": "Música", "estado": "SP", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Taina Cristina Esteves", "cidade": "Acudina", "formação": "Ciências Sociais", "estado": "BA", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Taina Cristine Chicao", "cidade": "Piedade de Caratinga", "formação": "Economia", "estado": "MG", "país": "Brasil", "interesses": ["society","volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Taina da Silva Menegucci", "cidade": "Caraa", "formação": "Ciências Sociais", "estado": "RS", "país": "Brasil", "interesses": ["música"] }
{"index": {}}
{"nome": "Taina de Assis Gomes", "cidade": "São Goncalo do Monte", "formação": "Estatística", "estado": "MG", "país": "Brasil", "interesses": ["volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Taina de Carvalho", "cidade": "Santo Antonio do Jardim", "formação": "Ciência da Computação", "estado": "SP", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Taina de Oliveira Rocha", "cidade": "São Roque", "formação": "Letras", "estado": "SP", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Taina de Souza Coimbra", "cidade": "Vera Guarani", "formação": "Artes Cênicas", "estado": "PR", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Taina de Souza Duarte Nogueira", "cidade": "Ilha Grande", "formação": "Letras", "estado": "MS", "país": "Brasil", "interesses": ["society"] }
{"index": {}}
{"nome": "Taina Fernandes Ferreira", "cidade": "Poligono do Erval", "formação": "Ciência da Computação", "estado": "RS", "país": "Brasil", "interesses": ["pintura","teatro"] }
{"index": {}}
{"nome": "Taina Filipe Araujo", "cidade": "São Francisco da Jararaca", "formação": "Física", "estado": "PA", "país": "Brasil", "interesses": ["volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Taina Franco Sterdi", "cidade": "Lagoa do Mato", "formação": "Estatística", "estado": "CE", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Taina Freitas Saldanha", "cidade": "Mococa", "formação": "Estatística", "estado": "SP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Taina Julia de Camargo", "cidade": "Piumhi", "formação": "Ciências Sociais", "estado": "MG", "país": "Brasil", "interesses": ["society","volei","voleibol"] }
{"index": {}}
{"nome": "Taina Julia Lourenco Santos", "cidade": "Marechal Thaumaturgo", "formação": "Estatística", "estado": "AC", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Taina Keiller Leao", "cidade": "Rio Quatorze", "formação": "Ciência da Computação", "estado": "PR", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Taina Lima de Almeida E Silva", "cidade": "Água Branca", "formação": "História", "estado": "PB", "país": "Brasil", "interesses": ["física"] }
{"index": {}}
{"nome": "Taina Marinho Alcaraz", "cidade": "Santo Antonio dos Palmares", "formação": "Educação Física", "estado": "PE", "país": "Brasil", "interesses": ["matemática","física"] }
{"index": {}}
{"nome": "Taina Mattos Cardoso", "cidade": "Jamanxinzinho", "formação": "Educação Física", "estado": "PA", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Taina Monteiro de Andrade E Silva", "cidade": "Queiroz", "formação": "História", "estado": "SP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Taina Nahed Kuhl", "cidade": "Esperanca do Norte", "formação": "Ciências Sociais", "estado": "PR", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Uallex Placido Santos", "cidade": "Nova Olinda", "formação": "Ciência da Computação", "estado": "PB", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Ueslei Henrique Macedo Corandim", "cidade": "Mosquito", "formação": "História", "estado": "TO", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Uilson de Almeida Gramarim Filho", "cidade": "Caporanga", "formação": "Artes Cênicas", "estado": "SP", "país": "Brasil", "interesses": ["física"] }
{"index": {}}
{"nome": "Uira Mariano Gamero", "cidade": "Bom Jardim de Goiás", "formação": "Educação Física", "estado": "GO", "país": "Brasil", "interesses": ["matemática","física","computação"] }
{"index": {}}
{"nome": "Uire Torquato Penhas de Lima Stefani", "cidade": "São Julião", "formação": "Ciências Sociais", "estado": "PI", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Ulder Jose Felisberto", "cidade": "Monumento", "formação": "Ciência da Computação", "estado": "RJ", "país": "Brasil", "interesses": ["volleyball"] }
{"index": {}}
{"nome": "Ulisses Alberto Miranda Neto", "cidade": "Frei Serafim", "formação": "Letras", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Ulisses Alberto Pereira", "cidade": "Mata Verde", "formação": "Ciência da Computação", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Ulisses Amadeu", "cidade": "Joa", "formação": "Letras", "estado": "PR", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Ulisses Franco Dedonato", "cidade": "Rio Tigre", "formação": "Ciência da Computação", "estado": "RS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Ulisses Marques Portugal", "cidade": "Palmeiras de São Paulo", "formação": "Economia", "estado": "SP", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Ulisses Zanardo Felipe", "cidade": "Ribeira do Pombal", "formação": "Artes Cênicas", "estado": "BA", "país": "Brasil", "interesses": ["matemática","física"] }
{"index": {}}
{"nome": "Ullys Marques da Gama E Santos", "cidade": "Itutinga", "formação": "Música", "estado": "MG", "país": "Brasil", "interesses": ["física","computação"] }
{"index": {}}
{"nome": "Uly Tamar Souza Benicio", "cidade": "Venda Branca", "formação": "Estatística", "estado": "SP", "país": "Brasil", "interesses": ["basquete","matemática","física"] }
{"index": {}}
{"nome": "Ulysses Agostini Garcia", "cidade": "Bauxi", "formação": "Ciências Sociais", "estado": "MT", "país": "Brasil", "interesses": ["society","volei","voleibol"] }
{"index": {}}
{"nome": "Ulysses Mikail Danton M da Silveira", "cidade": "Balsas", "formação": "História", "estado": "MA", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Ulysses Primo de Paiva Brunieri", "cidade": "Esquina Piratini", "formação": "Educação Física", "estado": "RS", "país": "Brasil", "interesses": ["society"] }
{"index": {}}
{"nome": "Ulysses Szajnbok de Faria", "cidade": "Ventura", "formação": "Educação Física", "estado": "BA", "país": "Brasil", "interesses": ["volei","voleibol"] }
{"index": {}}
{"nome": "Umayra Mohana Sousa Durgo", "cidade": "Caimbé", "formação": "Física", "estado": "BA", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Umberto Miranda de Souza", "cidade": "Mineiros do Tiete", "formação": "Ciências Sociais", "estado": "SP", "país": "Brasil", "interesses": ["volei"] }
{"index": {}}
{"nome": "Urbano Borges Martins Terceiro", "cidade": "Novo Horizonte", "formação": "História", "estado": "MG", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Ures Henrique Rabelo Folchini", "cidade": "Maetinga", "formação": "Educação Física", "estado": "BA", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Uriel Barbosa Lira Cunha", "cidade": "Analândia do Norte", "formação": "Matemática", "estado": "MT", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Uriel Carrenho Souza", "cidade": "Guapore", "formação": "Estatística", "estado": "RS", "país": "Brasil", "interesses": ["basquete","matemática","física"] }
{"index": {}}
{"nome": "Uriel Cesar Meneguzzi Carrano Bueno", "cidade": "Nova Petropolis", "formação": "Física", "estado": "RS", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Uriel de Souza Dias", "cidade": "Caio Prado", "formação": "Artes Cênicas", "estado": "CE", "país": "Brasil", "interesses": ["artes","pintura"] }
{"index": {}}
{"nome": "Uriel dos Santos Ferreira", "cidade": "Crissiumal", "formação": "Estatística", "estado": "RS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Uriel Engel Piffer", "cidade": "Candiota", "formação": "Artes Cênicas", "estado": "RS", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Uriel Padiglione Gomes Oliveira", "cidade": "Itatiba do Sul", "formação": "Matemática", "estado": "RS", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Uriel Pozzi Silva", "cidade": "Porto Feliz", "formação": "Ciências Sociais", "estado": "SP", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Uriens Moore Santana", "cidade": "Carrasco", "formação": "Ciências Sociais", "estado": "AL", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Vagner Anacleto Barbosa", "cidade": "Boca do Acre", "formação": "Artes Cênicas", "estado": "AM", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Vagner da Cruz Azevedo", "cidade": "Bairro Cachoeira", "formação": "História", "estado": "PR", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Vagner Gomes de Oliveira", "cidade": "Nova Londrina", "formação": "Economia", "estado": "PR", "país": "Brasil", "interesses": ["teatro","música"] }
{"index": {}}
{"nome": "Vagner Honorio dos Santos", "cidade": "Pimenteira", "formação": "História", "estado": "BA", "país": "Brasil", "interesses": ["artes","pintura"] }
{"index": {}}
{"nome": "Vagner Luis Justino", "cidade": "Curiuva", "formação": "Educação Física", "estado": "PR", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Vagner Martins da Costa", "cidade": "São Jeronimo da Serra", "formação": "Estatística", "estado": "PR", "país": "Brasil", "interesses": ["volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Vagner Prado Gomes", "cidade": "Lago Preto", "formação": "Música", "estado": "AM", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Vailda da Silva Quaresma Fernandes", "cidade": "Serra do Camapua", "formação": "Ciência da Computação", "estado": "MG", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Vaisy Alencar Beserra", "cidade": "Jeceaba", "formação": "Educação Física", "estado": "MG", "país": "Brasil", "interesses": ["futebol"] }
{"index": {}}
{"nome": "Valdeir Bezerra Santana", "cidade": "Taboquinha", "formação": "História", "estado": "AL", "país": "Brasil", "interesses": ["futebol"] }
{"index": {}}
{"nome": "Valdemar Adao Neto", "cidade": "Olho D'Água Dos Dandanhas", "formação": "Economia", "estado": "AL", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Valdemir Almeida Santos", "cidade": "Rio Bonito do Iguacu", "formação": "Física", "estado": "PR", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Valdete Braga de Lima", "cidade": "Nossa Senhora das Gracas", "formação": "Matemática", "estado": "PR", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Valdimeire Ornelas de Oliveira", "cidade": "São Bernardino", "formação": "Ciência da Computação", "estado": "SC", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Valdir Monteiro dos Santos Godoi", "cidade": "Córrego dos Monos", "formação": "Física", "estado": "ES", "país": "Brasil", "interesses": ["física"] }
{"index": {}}
{"nome": "Valdir Oliveira Romano", "cidade": "Santa Rosa", "formação": "Música", "estado": "GO", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Valdirene Gomes de Sousa", "cidade": "Sitio da Baraúna", "formação": "Educação Física", "estado": "BA", "país": "Brasil", "interesses": ["física"] }
{"index": {}}
{"nome": "Valdivino Siqueira das Dores", "cidade": "Humaitá", "formação": "História", "estado": "AM", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Valdomiro Toshiaki Yamamoto", "cidade": "Porto Trombetas", "formação": "História", "estado": "PA", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Valdson Costa Almeida", "cidade": "Aparecida", "formação": "Física", "estado": "PB", "país": "Brasil", "interesses": ["artes","pintura"] }
{"index": {}}
{"nome": "Valentina Thibes Dalfovo", "cidade": "José Boiteux", "formação": "Ciência da Computação", "estado": "SC", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Valentina Vezza Soares", "cidade": "Osvaldo Cruz", "formação": "Física", "estado": "RS", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Valeria Aparecida Pinto Macedo", "cidade": "Águas de Santa Barbara", "formação": "Física", "estado": "SP", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Valeria Batista Boreck Seki", "cidade": "Arapuan", "formação": "Ciências Sociais", "estado": "PR", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Valeria Bullo Robalinho", "cidade": "Calcoene", "formação": "Educação Física", "estado": "AP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Valeria Camargo Policarpo", "cidade": "São Joaquim", "formação": "Física", "estado": "MT", "país": "Brasil", "interesses": ["volleyball"] }
{"index": {}}
{"nome": "Valeria Cristina dos Santos Chagas", "cidade": "Panambi", "formação": "Física", "estado": "MS", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Valeria dos Santos Peso", "cidade": "Bernardino de Campos", "formação": "Matemática", "estado": "SP", "país": "Brasil", "interesses": ["volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Valeria Fernandes dos Santos", "cidade": "São Tiago", "formação": "Física", "estado": "ES", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Valeria Fontes", "cidade": "Nossa Senhora das Gracas", "formação": "Ciência da Computação", "estado": "PR", "país": "Brasil", "interesses": ["física","computação","artes"] }
{"index": {}}
{"nome": "Valeria Foster Kimizuka", "cidade": "Sul Brasil", "formação": "Estatística", "estado": "SC", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Valeria Magalhaes Frajuca", "cidade": "Caldeirões de Cima", "formação": "Letras", "estado": "AL", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Valeria Talpe Nunes", "cidade": "Dias Tavares/siderurgica", "formação": "Ciência da Computação", "estado": "MG", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Valeria Veras Lopes", "cidade": "Jaguara", "formação": "Letras", "estado": "BA", "país": "Brasil", "interesses": ["computação","artes"] }
{"index": {}}
{"nome": "Valeriana de Jesus Santos", "cidade": "São João da Boa Vista", "formação": "Ciência da Computação", "estado": "SP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Valeska Paroni Silva", "cidade": "Alto Alegre", "formação": "História", "estado": "SP", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Valeska Roberta da Silva Morais", "cidade": "São Vicente do Grama", "formação": "Educação Física", "estado": "MG", "país": "Brasil", "interesses": ["pintura"] }
{"index": {}}
{"nome": "Vallery Pereira Cardoso", "cidade": "Barreiro", "formação": "Ciência da Computação", "estado": "PR", "país": "Brasil", "interesses": ["volleyball","basquete"] }
{"index": {}}
{"nome": "Valmerson Barbosa da Silva", "cidade": "Catingal", "formação": "Educação Física", "estado": "BA", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Valnir Rogerio Trava Airoldi", "cidade": "Cambara do Sul", "formação": "História", "estado": "RS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Valquiria Cristiane Tersi Ribeiro Vanzo", "cidade": "Boa Esperanca", "formação": "Economia", "estado": "PA", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Valquiria Parnaiba Ferreira", "cidade": "Córrego do Ouro", "formação": "Economia", "estado": "MG", "país": "Brasil", "interesses": ["society","volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Valquiria Wollinger de Lima", "cidade": "Jambuacu", "formação": "Artes Cênicas", "estado": "PA", "país": "Brasil", "interesses": ["pintura","teatro"] }
{"index": {}}
{"nome": "Valquria Barbosa da Fonseca", "cidade": "Salgado Filho", "formação": "Ciência da Computação", "estado": "PR", "país": "Brasil", "interesses": ["artes","pintura","teatro","música"] }
{"index": {}}
{"nome": "Valter Cardoso da Costa", "cidade": "São Valerio da Natividade", "formação": "Estatística", "estado": "TO", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Valter Egidio Ferrari Dutra", "cidade": "Paiáguas", "formação": "Matemática", "estado": "MS", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Valter Fausto dos Santos", "cidade": "São Felipe", "formação": "Ciências Sociais", "estado": "AM", "país": "Brasil", "interesses": ["society"] }
{"index": {}}
{"nome": "Valter Luiz Piedade Neto", "cidade": "Bernardino de Campos", "formação": "Matemática", "estado": "SP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Valter Marcena Pessoa", "cidade": "Poções", "formação": "Letras", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Valter Novais Carvalho Junior", "cidade": "Rio da Dona", "formação": "Ciências Sociais", "estado": "BA", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Vanda de Jesus Araujo", "cidade": "Boa Esperanca", "formação": "Estatística", "estado": "PA", "país": "Brasil", "interesses": ["artes","pintura","teatro"] }
{"index": {}}
{"nome": "Wagner Alves Pereira", "cidade": "Itaperuna", "formação": "Física", "estado": "RJ", "país": "Brasil", "interesses": ["society"] }
{"index": {}}
{"nome": "Wagner Ayres Rodrigues Neto", "cidade": "São Pedro da Água Branca", "formação": "História", "estado": "MA", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Wagner Flora Anelio", "cidade": "Cruz de Pedra", "formação": "Letras", "estado": "CE", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Wagner Guedes de Oliveira", "cidade": "Teresopolis", "formação": "Música", "estado": "RJ", "país": "Brasil", "interesses": ["pintura","teatro","música"] }
{"index": {}}
{"nome": "Wagner Jorcuvich Nunes da Silva", "cidade": "Maquine", "formação": "Economia", "estado": "RS", "país": "Brasil", "interesses": ["teatro","música"] }
{"index": {}}
{"nome": "Wagner Luiz Marques da Silva Simao", "cidade": "Duas Barras", "formação": "Letras", "estado": "ES", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Wagner Miguel dos Santos", "cidade": "Icara", "formação": "Letras", "estado": "PR", "país": "Brasil", "interesses": ["pintura"] }
{"index": {}}
{"nome": "Wagner Rodolfo da Silva", "cidade": "Rio Espera", "formação": "Ciências Sociais", "estado": "MG", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Wagner Rosales Chavez", "cidade": "Capão Bonito", "formação": "Ciências Sociais", "estado": "SP", "país": "Brasil", "interesses": ["teatro","música"] }
{"index": {}}
{"nome": "Wagner Santos Souza", "cidade": "Governador Nunes Freire", "formação": "História", "estado": "MA", "país": "Brasil", "interesses": ["matemática","física"] }
{"index": {}}
{"nome": "Wagner Silva", "cidade": "Rosario do Catete", "formação": "Matemática", "estado": "SE", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Wagner Siqueira de Brito Alvares", "cidade": "Novo Itacolomi", "formação": "Ciências Sociais", "estado": "PR", "país": "Brasil", "interesses": ["pintura"] }
{"index": {}}
{"nome": "Wagner Valim Trova", "cidade": "Trombas", "formação": "História", "estado": "GO", "país": "Brasil", "interesses": ["society","volei","voleibol","volleyball"] }
{"index": {}}
{"nome": "Wagner Vo", "cidade": "São Francisco do Gloria", "formação": "Ciência da Computação", "estado": "MG", "país": "Brasil", "interesses": ["teatro"] }
{"index": {}}
{"nome": "Walace Santos Barbosa", "cidade": "Campestre", "formação": "Educação Física", "estado": "AL", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Walas Joao Ribeiro da Silva", "cidade": "Tenente Laurentino Cruz", "formação": "Física", "estado": "RN", "país": "Brasil", "interesses": ["voleibol"] }
{"index": {}}
{"nome": "Walassy do Carmo Cardoso", "cidade": "Minduri", "formação": "Física", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Walber Naruhito Yamaoka Franco", "cidade": "Nossa Senhora da Penha", "formação": "Ciência da Computação", "estado": "RJ", "país": "Brasil", "interesses": ["volei","voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Waldes Rubens Soares", "cidade": "Jaguarari", "formação": "Ciências Sociais", "estado": "BA", "país": "Brasil", "interesses": ["matemática"] }
{"index": {}}
{"nome": "Waldir Bertazzi Junior", "cidade": "São Manoel do Guaiácu", "formação": "Educação Física", "estado": "MG", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Waldir Carlos dos Santos", "cidade": "Potengi", "formação": "Física", "estado": "CE", "país": "Brasil", "interesses": ["volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Waleska Maria Sorrini da Costa", "cidade": "Guatambu", "formação": "Ciências Sociais", "estado": "SC", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Walisson Higor da Cruz", "cidade": "Barrania", "formação": "Matemática", "estado": "SP", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Walkyria Maria Soares Pires B de Arruda", "cidade": "São Tiago", "formação": "Estatística", "estado": "ES", "país": "Brasil", "interesses": ["física","computação","artes","pintura"] }
{"index": {}}
{"nome": "Wallace Andrei de Moraes Fonseca", "cidade": "Belem da Cachoeira", "formação": "Economia", "estado": "BA", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Wallace Gleen Lima Fialho", "cidade": "Quixelo", "formação": "Música", "estado": "CE", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Wallace Hiago Fernandes", "cidade": "Manuel Duarte", "formação": "Física", "estado": "RJ", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Wallace Mariano", "cidade": "Guarauna", "formação": "Economia", "estado": "PR", "país": "Brasil", "interesses": ["matemática","física","computação","artes"] }
{"index": {}}
{"nome": "Wallace Marino Saran", "cidade": "Nova Veneza", "formação": "Física", "estado": "SP", "país": "Brasil", "interesses": ["basquete","matemática"] }
{"index": {}}
{"nome": "Wallace Mendonca Rodrigues", "cidade": "Afrânio Peixoto", "formação": "Matemática", "estado": "BA", "país": "Brasil", "interesses": ["volei"] }
{"index": {}}
{"nome": "Wallace Silva Rezende", "cidade": "Quixada", "formação": "Economia", "estado": "CE", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Wallas Marcelo Cirino", "cidade": "Ariri", "formação": "Artes Cênicas", "estado": "AP", "país": "Brasil", "interesses": ["volleyball","basquete"] }
{"index": {}}
{"nome": "Wallid Abuchahin", "cidade": "Honoropolis", "formação": "Letras", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Wallison de Lima Tinti", "cidade": "Cotia", "formação": "Letras", "estado": "SP", "país": "Brasil", "interesses": ["volei","voleibol"] }
{"index": {}}
{"nome": "Walmir Alison Simiao", "cidade": "Eugenio de Castro", "formação": "Física", "estado": "RS", "país": "Brasil", "interesses": ["física","computação"] }
{"index": {}}
{"nome": "Walquiria de Magalhaes Santos", "cidade": "Avai do Jacinto", "formação": "Artes Cênicas", "estado": "MG", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Walquiria Tiburcio", "cidade": "Pernambuquinho", "formação": "Física", "estado": "CE", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Walter Cezar de Paiva", "cidade": "João Dourado", "formação": "Estatística", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Walter Etsuo Watanabe", "cidade": "Goiásabeira", "formação": "Economia", "estado": "MG", "país": "Brasil", "interesses": ["música"] }
{"index": {}}
{"nome": "Walter Fernando Pinto", "cidade": "Piedade do Parãopeba", "formação": "Ciências Sociais", "estado": "MG", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Walter Luiz Manzi de Azevedo", "cidade": "Fruta de Leite", "formação": "Economia", "estado": "MG", "país": "Brasil", "interesses": ["volleyball","basquete","matemática"] }
{"index": {}}
{"nome": "Walter Mendes Medeiros", "cidade": "Baixinha", "formação": "Educação Física", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Walter Paneque Neto", "cidade": "Tapirama", "formação": "História", "estado": "BA", "país": "Brasil", "interesses": ["computação","artes","pintura"] }
{"index": {}}
{"nome": "Walter Von Sohsten Xavier Lins", "cidade": "Campo Grande", "formação": "Ciência da Computação", "estado": "MS", "país": "Brasil", "interesses": ["futebol"] }
{"index": {}}
{"nome": "Walterdan E Silva Miranda", "cidade": "Inhamuns", "formação": "Ciências Sociais", "estado": "CE", "país": "Brasil", "interesses": ["física","computação","artes"] }
{"index": {}}
{"nome": "Walyson Lanza de Souza", "cidade": "Riacho Seco", "formação": "Ciências Sociais", "estado": "BA", "país": "Brasil", "interesses": ["basquete"] }
{"index": {}}
{"nome": "Wanda Maria de Souza", "cidade": "Acopiara", "formação": "Letras", "estado": "CE", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Wander Luis Ferreira Junior", "cidade": "São Francisco Xavier", "formação": "Matemática", "estado": "SP", "país": "Brasil", "interesses": ["voleibol","volleyball","basquete"] }
{"index": {}}
{"nome": "Wander Vianez Pereira", "cidade": "Maua", "formação": "Música", "estado": "SP", "país": "Brasil", "interesses": ["artes"] }
{"index": {}}
{"nome": "Wandercleyber da Silva Lima", "cidade": "Castanhal", "formação": "Economia", "estado": "PA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Wanderson Alves Martins", "cidade": "Mangabeira", "formação": "Estatística", "estado": "CE", "país": "Brasil", "interesses": ["futebol","society","volei","voleibol"] }
{"index": {}}
{"nome": "Yagnes Roberta Salomao", "cidade": "Caraiba", "formação": "Economia", "estado": "GO", "país": "Brasil", "interesses": ["basquete"] }
{"index": {}}
{"nome": "Yago Alencar Marinho", "cidade": "Teutonia", "formação": "Economia", "estado": "RS", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Yago Caetano de Sousa Almeida", "cidade": "Tanquinho do Poço", "formação": "Estatística", "estado": "BA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Yago Figueira Costa", "cidade": "Tigipio", "formação": "Música", "estado": "SC", "país": "Brasil", "interesses": ["física"] }
{"index": {}}
{"nome": "Yago Henrique Reis Ribeiro", "cidade": "Tupi Silveira", "formação": "História", "estado": "RS", "país": "Brasil", "interesses": ["volei","voleibol"] }
{"index": {}}
{"nome": "Yago Krugner Figueiredo", "cidade": "Palmeirante", "formação": "Economia", "estado": "TO", "país": "Brasil", "interesses": ["volleyball","basquete","matemática","física"] }
{"index": {}}
{"nome": "Yago Matheus da Silva", "cidade": "Cacha Pregos", "formação": "Matemática", "estado": "BA", "país": "Brasil", "interesses": ["society","volei","voleibol"] }
{"index": {}}
{"nome": "Yago Merici Oriani", "cidade": "Gázea", "formação": "Matemática", "estado": "CE", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Yago Oliveira da Luz", "cidade": "São Roberto", "formação": "Ciências Sociais", "estado": "PA", "país": "Brasil", "interesses": ["futebol","society","volei"] }
{"index": {}}
{"nome": "Yago Rodrigues Neves", "cidade": "Braganca", "formação": "Educação Física", "estado": "PA", "país": "Brasil", "interesses": [] }
{"index": {}}
{"nome": "Yago Vieira", "cidade": "Fraiburgo", "formação": "Economia", "estado": "SC", "país": "Brasil", "interesses": ["física"] }
{"index": {}}
{"nome": "Yahsmim de Lima", "cidade": "Bandeirantes do Tocantins", "formação": "Ciência da Computação", "estado": "TO", "país": "Brasil", "interesses": ["futebol","society"] }
{"index": {}}
{"nome": "Yamara Lopes", "cidade": "Algodoes", "formação": "Matemática", "estado": "CE", "país": "Brasil", "interesses": ["pintura"] }
{"index": {}}
{"nome": "Yamila Guadalupe Toro Fernandez", "cidade": "Marcilio Dias", "formação": "Matemática", "estado": "SC", "país": "Brasil", "interesses": ["computação","artes","pintura","teatro"] }


#*****************************************
# AULA 9
#*****************************************

GET pessoas/_search
{
  "query": {
    "match_all": {}
  }
}

GET pessoas/_search
{
  "query": {
    "exists": {
      "field": "cep"
    }
  }
}


GET pessoas/_search
{
  "query": {
    "term": {
      "estado": {
        "value": "BA"
      }
    }
  }
}

GET pessoas/_search
{
  "_source": ["nome", "cidade", "formação"], 
  "query": {
    "term": { "estado": "BA" }
  }
}

GET pessoas/_search
{
  "_source": ["nome", "cidade", "formação"], 
  "query": {
    "bool": {
      "must": [
        {"term": { "estado": "BA" }}
      ],
      "should": [
        {"term": { "formação.original": "Física" }}
      ]
    }
  }
}


GET pessoas/_search
{
  "_source": ["nome", "cidade", "formação"], 
  "query": {
    "bool": {
      "must": [
        {"term": { "estado": "BA" }}
      ],
      "must_not": [
        {"term": { "formação.original": "Física" }}
      ]
    }
  }
}

GET pessoas/_search
{
    "_source": [
        "nome",
        "cidade",
        "formação"
    ],
    "query": {
        "bool": {
            "must": [
                {
                    "term": {
                        "estado": "BA"
                    }
                }
            ],
            "must_not": [
                {
                    "term": {
                        "formação.original": "Física"
                    }
                }
            ],
            "filter": {
                "range": {
                    "nome.original": {
                        "gte": "A",
                        "lte": "Czzzzzz"
                    }
                }
            }
        }
    }
}

GET pessoas/_search
{
  "_source": ["nome", "cidade", "formação"], 
  "query": {
    "bool": {
      "must": [
        {"term": { "estado": "BA" }},
        {"match": {"formação": "fisica" }}
      ]
    }
  }
}


GET pessoas/_search
{
  "_source": ["nome", "cidade", "formação"], 
  "query": {
    "bool": {
      "must": [
        {"term": { "estado": "BA" }},
        {"match": {"formação": "fisica" }}
      ]
    }
  },
  "sort": [
    {
      "cidade.original": {
        "order": "asc"
      },
      "nome.original": {
        "order": "desc"
      }
    }
  ]
}

GET pessoas/_search
{
  "query": {
    "match": {
      "formação": "fisica"
    }
  },
  "aggs": {
    "pessoas formadas em física por estado": {
      "terms": {
        "field": "estado"
      }
    }
  }
}






