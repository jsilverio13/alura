
(ns datomic-bindings-transaction-functions-e-filters.ecommerce.aula4

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

(dotimes [_ 10] (db/visualizacao! conn (:produto/id primeiro)))
(pprint (db/um-produto (d/db conn) (:produto/id primeiro)))