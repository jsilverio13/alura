(ns datomic-banco-filtrado-e-historico.ecommerce.aula1
  (:require [clojure.pprint :refer [pprint]]
            [datomic-banco-filtrado-e-historico.ecommerce.db :as db]
            [datomic.api :as d]
            [schema.core :as s]))

(s/set-fn-validation! true)

(db/apaga-banco!)
(def conn (db/abre-conexao!))
(db/cria-schema! conn)
(db/cria-dados-de-exemplo conn)

(def primeiro (first (db/todos-os-produtos (d/db conn))))
(pprint primeiro)