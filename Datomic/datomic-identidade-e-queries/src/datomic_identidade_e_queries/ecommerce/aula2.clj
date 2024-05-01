(ns datomic-identidade-e-queries.ecommerce.aula2
  (:require [clojure.pprint :refer [pprint]]
            [datomic-identidade-e-queries.ecommerce.model :as model]
            [datomic.api :as d]
            [datomic-identidade-e-queries.ecommerce.db :as db]))

(def conn (db/abre-conexao!))

(db/cria-schema! conn)

(def computador (model/novo-produto (model/uuid) "Computador Novo", "/computador-novo", 2500.10M))
(def celular (model/novo-produto (model/uuid) "Celular Caro", "/celular", 888888.10M))
(def calculadora {:produto/nome "Calculadora com 4 operações"})
(def celular-barato (model/novo-produto "Celular Barato", "/celular-barato", 0.1M))


(pprint @(d/transact conn [computador, celular, calculadora, celular-barato]))
(def produtos (db/todos-os-produtos (d/db conn)))
(pprint produtos)

(def celular-barato-2 (model/novo-produto (:produto/id celular-barato) "CELULAR BARATO!!!", "celular-baratíssimo", 0.0001M))

(pprint @(d/transact conn [celular-barato-2]))

(def produtos (db/todos-os-produtos (d/db conn)))
(pprint produtos)

;(db/apaga-banco)