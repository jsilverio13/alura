(ns datomic-banco-filtrado-e-historico.ecommerce.aula3
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
(pprint venda1)

(pprint (db.venda/custo (d/db conn) venda1))
(pprint (db.venda/custo (d/db conn) venda2))


(pprint @(db.produto/adiciona-ou-altera! conn [{:produto/id    (:produto/id primeiro)
                                                :produto/preco 300M}]))


(d/q '[:find ?tx .
       :in $ ?id
       :where [_ :venda/id ?id ?tx true]]
     (d/db conn) venda1)

(d/q '[:find ?atributo ?valor
       :in $ ?id
       :where [_ venda/id ?id ?tx true]
       [?tx ?atributo ?valor]]
     (d/db conn) venda1)

(d/q '[:find ?instante .
       :in $ ?id
       :where [_ venda/id ?id ?tx true]
       [?tx :db/txInstant ?instante]]
     (d/db conn) venda1)

(pprint (db.venda/custo (d/db conn) venda1))
(pprint (db.venda/custo (d/db conn) venda2))