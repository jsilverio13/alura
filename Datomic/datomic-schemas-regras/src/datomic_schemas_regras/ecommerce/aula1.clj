(ns datomic-schemas-regras.ecommerce.aula1
  (:require [clojure.pprint :refer [pprint]]
            [datomic-schemas-regras.ecommerce.db :as db]
            [datomic-schemas-regras.ecommerce.model :as model]
            [datomic.api :as d]
            [schema.core :as s]))


(s/set-fn-validation! true)
(db/apaga-banco!)
(def conn (db/abre-conexao!))
(db/cria-schema! conn)
#_{:clj-kondo/ignore [:inline-def]}
(defn testa-schema []
  (def computador (model/novo-produto (model/uuid) "Computador Novo", "/computador-novo", 2500.10M))
  (pprint (s/validate model/Produto computador))

  (def eletronicos (model/nova-categoria (model/uuid) "Eletronicos"))
  (pprint (s/validate model/Categoria eletronicos))
  (pprint (s/validate model/Produto (assoc computador :produto/categoria eletronicos))))

(testa-schema)

(db/cria-dados-de-exemplo conn)

(pprint (db/todas-as-categorias (d/db conn)))
(pprint (db/todos-os-produtos (d/db conn)))