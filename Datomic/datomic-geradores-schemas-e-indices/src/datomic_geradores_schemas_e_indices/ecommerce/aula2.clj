(ns datomic-geradores-schemas-e-indices.ecommerce.aula2

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

#_{:clj-kondo/ignore [:inline-def]}
(defn gera-10000-produtos [conn]
  (dotimes [atual 50]
    (def produtos-gerados (g/sample 100 model/Produto generators/leaf-generators))
    (println atual
             (count @(db.produto/adiciona-ou-altera! conn
                                                     produtos-gerados)))))

(println "A geração de produtos")
(time (gera-10000-produtos conn))
(println "Busca do mais caro")
(time (dotimes [_ 100] (db.produto/busca-mais-caro (d/db conn))))
(println "Busca dos mais caros que")
(time (dotimes [_ 100] (count (db.produto/busca-mais-caros-que (d/db conn) 50000M))))