
(ns datomic-bindings-transaction-functions-e-filters.ecommerce.aula3

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

(pprint @(db/adiciona-variacao! conn (:produto/id primeiro) "Season pass" 40M))
(pprint @(db/adiciona-variacao! conn (:produto/id primeiro) "Season pass 4 anos" 60M))

(pprint
 (d/q '[:find (pull ?produto [*])
        :where [?produto :produto/nome]]
      (d/db conn)))

(pprint (db/todos-os-produtos (d/db conn)))
(pprint (db/total-de-produtos (d/db conn)))
(pprint @(db/remove-produto! conn (:produto/id primeiro)))
(pprint (db/total-de-produtos (d/db conn)))