(ns datomic-geradores-schemas-e-indices.ecommerce.aula1

  (:require [clojure.pprint :refer [pprint]]
            [datomic.api :as d]
            [ecommerce.db.config :as db.config]
            [ecommerce.db.produto :as db.produto]
            [schema.core :as s]))

(s/set-fn-validation! true)

(db.config/apaga-banco!)
(def conn (db.config/abre-conexao!))
(db.config/cria-schema! conn)
(db.config/cria-dados-de-exemplo! conn)

(pprint (db.produto/todos (d/db conn)))