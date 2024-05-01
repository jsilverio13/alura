2 (ns datomic-bindings-transaction-functions-e-filters.ecommerce.aula1

    (:require [clojure.pprint :refer [pprint]]
              [datomic-bindings-transaction-functions-e-filters.ecommerce.db :as db]
              [datomic.api :as d]
              [schema.core :as s]))

(s/set-fn-validation! true)

(db/apaga-banco!)
(def conn (db/abre-conexao!))
(db/cria-schema! conn)
(db/cria-dados-de-exemplo conn)

(pprint (db/todos-os-produtos (d/db conn)))

(pprint (db/todos-os-produtos-nas-categorias (d/db conn) ["Eletrônicos" "Alimentação"]))
(pprint (db/todos-os-produtos-nas-categorias (d/db conn) ["Eletrônicos" "Esporte"]))
(pprint (db/todos-os-produtos-nas-categorias (d/db conn) ["Esporte"]))
(pprint (db/todos-os-produtos-nas-categorias (d/db conn) []))
(pprint (db/todos-os-produtos-nas-categorias (d/db conn) ["Alimentação"]))


(pprint (db/todos-os-produtos-nas-categorias-e-digital (d/db conn) ["Esporte"] true))
(pprint (db/todos-os-produtos-nas-categorias-e-digital (d/db conn) ["Esporte"] false))

(pprint (db/todos-os-produtos-nas-categorias-e-digital (d/db conn) ["Eletrônicos"] true))