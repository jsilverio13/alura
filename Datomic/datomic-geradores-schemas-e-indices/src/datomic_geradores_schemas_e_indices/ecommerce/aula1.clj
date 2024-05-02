(ns datomic-geradores-schemas-e-indices.ecommerce.aula1

  (:require [clojure.pprint :refer [pprint]]
            [schema-generators.generators :as g]
            [datomic-geradores-schemas-e-indices.ecommerce.db.config :as db.config]
            [datomic-geradores-schemas-e-indices.ecommerce.db.produto :as db.produto]
            [datomic-geradores-schemas-e-indices.ecommerce.generators :as generators]
            [datomic-geradores-schemas-e-indices.ecommerce.model :as model]
            [datomic.api :as d]
            [schema.core :as s]))

(s/set-fn-validation! true)

(db.config/apaga-banco!)
(def conn (db.config/abre-conexao!))
(db.config/cria-schema! conn)
(db.config/cria-dados-de-exemplo! conn)

(pprint (db.produto/todos (d/db conn)))

(pprint (g/sample 10 model/Categoria))
(pprint (g/sample 10 model/Variacao generators/leaf-generators))