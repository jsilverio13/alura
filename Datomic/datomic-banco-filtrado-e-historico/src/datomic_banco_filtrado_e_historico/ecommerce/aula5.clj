(ns datomic-banco-filtrado-e-historico.ecommerce.aula5
  (:require [clojure.pprint :refer [pprint]]
            [datomic-banco-filtrado-e-historico.ecommerce.db.config :as db.config]
            [datomic-banco-filtrado-e-historico.ecommerce.db.produto :as db.produto]
            [datomic-banco-filtrado-e-historico.ecommerce.db.venda :as db.venda]
            [datomic.api :as d]
            [schema.core :as s]))

(s/set-fn-validation! true)

(db.config/apaga-banco!)
(def conn (db.config/abre-conexao!))
(db.config/cria-schema! conn)
(db.config/cria-dados-de-exemplo! conn)

(def primeiro (first (db.produto/todos (d/db conn))))
(pprint primeiro)

(def venda1 (db.venda/adiciona! conn (:produto/id primeiro) 3))
(def venda2 (db.venda/adiciona! conn (:produto/id primeiro) 4))
(def venda3 (db.venda/adiciona! conn (:produto/id primeiro) 8))
(pprint venda1)


(pprint @(db.venda/altera-situacao! conn venda1 "preparando"))
(pprint @(db.venda/altera-situacao! conn venda2 "preparando"))
(pprint @(db.venda/altera-situacao! conn venda2 "a caminho"))
(pprint @(db.venda/altera-situacao! conn venda2 "entregue"))

(pprint (db.venda/historico (d/db conn) venda2))

(pprint @(db.venda/cancela! conn venda1))
(pprint (db.venda/historico (d/db conn) venda1))


(pprint (count (db.venda/todas-nao-canceladas (d/db conn))))
(pprint (count (db.venda/todas-inclusive-canceladas (d/db conn))))
(pprint (count (db.venda/todas-canceladas (d/db conn))))

(pprint (db.venda/historico-geral (d/db conn) #inst "2024-05-02T19:48:03.183-00:00"))

(pprint (db.venda/historico-geral (d/db conn) #inst "2024-05-02T19:48:03.100-00:00"))