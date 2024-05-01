(ns datomic-bindings-transaction-functions-e-filters.ecommerce.aula5

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

(def segundo (second (db/todos-os-produtos (d/db conn))))
(pprint segundo)

(def ola
  (d/function '{:lang   :clojure
                :params [nome]
                :code   (str "Olá " nome)}))

(pprint (ola "Jeff"))

(def incrementa-visualizacao
  #db/fn {:lang :clojure
          :params [db produto-id]
          :code
          (let [visualizacoes (d/q '[:find ?visualizacoes .
                                     :in $ ?id
                                     :where [?produto :produto/id ?id]
                                     [?produto :produto/visualizacoes ?visualizacoes]]
                                   db produto-id)
                atual (or visualizacoes 0)
                total-novo (inc atual)]
            [{:produto/id produto-id
              :produto/visualizacoes total-novo}])})

@(d/transact
  conn
  [{:db/doc   "Incrementa o atributo :produto/visualizacoes de uma entidade"
    :db/ident :incrementa-visualizacao
    :db/fn    incrementa-visualizacao}])

(dotimes [_ 10] (db/visualizacao! conn (:produto/id primeiro)))
(pprint (db/um-produto (d/db conn) (:produto/id primeiro)))

(dotimes [_ 10] (db/visualizacao! conn (:produto/id segundo)))
(pprint (db/um-produto (d/db conn) (:produto/id segundo)))