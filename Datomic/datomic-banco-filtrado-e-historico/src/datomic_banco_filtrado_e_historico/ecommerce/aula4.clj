(ns datomic-banco-filtrado-e-historico.ecommerce.aula4
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

@(db.venda/cancela! conn venda2)
(db.venda/todas-nao-canceladas (d/db conn))
(db.venda/todas-inclusive-canceladas (d/db conn))
(db.venda/todas-canceladas (d/db conn))


(pprint @(db.produto/adiciona-ou-altera! conn
                                         [{:produto/id    (:produto/id primeiro)
                                           :produto/preco 300M}]))
(pprint @(db.produto/adiciona-ou-altera! conn
                                         [{:produto/id    (:produto/id primeiro)
                                           :produto/preco 250M}]))
(pprint @(db.produto/adiciona-ou-altera! conn
                                         [{:produto/id    (:produto/id primeiro)
                                           :produto/preco 277M}]))
(pprint @(db.produto/adiciona-ou-altera! conn
                                         [{:produto/id    (:produto/id primeiro)
                                           :produto/preco 21M}]))

(db.produto/historico-de-precos (d/db conn) (:produto/id primeiro))