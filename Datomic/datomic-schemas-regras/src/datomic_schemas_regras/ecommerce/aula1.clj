(ns datomic-schemas-regras.ecommerce.aula1
  (:require [clojure.pprint :refer [pprint]]
            [datomic-schemas-regras.ecommerce.db :as db]
            [datomic-schemas-regras.ecommerce.model :as model]
            [datomic.api :as d]))

(db/apaga-banco!)
(def conn (db/abre-conexao!))
(db/cria-schema! conn)
(db/cria-dados-de-exemplo conn)



(pprint (db/todos-os-produtos (d/db conn)))
(pprint (db/todas-as-categorias (d/db conn)))
