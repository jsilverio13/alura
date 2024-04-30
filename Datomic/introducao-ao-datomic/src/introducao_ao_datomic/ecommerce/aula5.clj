(ns introducao-ao-datomic.ecommerce.aula5
  (:require [clojure.pprint :refer [pprint]]
            [datomic.api :as d]
            [introducao-ao-datomic.ecommerce.db :as db]
            [introducao-ao-datomic.ecommerce.model :as model]))

(def conn (db/abre-conexao))

(db/cria-schema conn)

; não me importa como você extrai o MOMENTO da transação
; o que importa é vc usar esse momento pro seu as-of
; aqui no resultado da transacao eu podia usar o db-after
(let [computador (model/novo-produto "Computador Novo", "/computador-novo", 2500.10M)
      celular (model/novo-produto "Celular Caro", "/celular", 888888.10M)
      resultado @(d/transact conn [computador, celular])]
  (pprint resultado))

; meu snapshot, posso usar o momento real
(def fotografia-no-passado (d/db conn))

(let [calculadora {:produto/nome "Calculadora com 4 operações"}
      celular-barato (model/novo-produto "Celular Barato", "/celular-barato", 0.1M)
      resultado @(d/transact conn [calculadora, celular-barato])]
  (pprint resultado))

; um snapshot no instante do d/db = 4
(pprint (count (db/todos-os-produtos (d/db conn))))

; rodando a query num banco filtrado com dados do passado = 2
(pprint (count (db/todos-os-produtos fotografia-no-passado)))


;(db/apaga-banco)