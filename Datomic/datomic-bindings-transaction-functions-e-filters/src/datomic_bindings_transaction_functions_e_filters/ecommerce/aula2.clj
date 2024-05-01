
(ns datomic-bindings-transaction-functions-e-filters.ecommerce.aula2

  (:require [clojure.pprint :refer [pprint]]
            [datomic-bindings-transaction-functions-e-filters.ecommerce.db :as db]
            [datomic.api :as d]
            [schema.core :as s]))

(s/set-fn-validation! true)

(db/apaga-banco!)
(def conn (db/abre-conexao!))
(db/cria-schema! conn)
(db/cria-dados-de-exemplo conn)

(def primeiro (first (db/todos-os-produtos (d/db conn))))
(pprint primeiro)

(db/atualiza-preco! conn (:produto/id primeiro) (:produto/preco primeiro) 20M)

(def primeiro-atualizado (first (db/todos-os-produtos (d/db conn))))
(pprint primeiro-atualizado)

(def segundo (second (db/todos-os-produtos (d/db conn))))
(pprint segundo)

(def a-atualizar {:produto/id (:produto/id segundo) :produto/preco 3000M, :produto/estoque 8})

(db/atualiza-produto! conn segundo a-atualizar)

(def segundo-atualizado (second (db/todos-os-produtos (d/db conn))))
(pprint segundo-atualizado)
