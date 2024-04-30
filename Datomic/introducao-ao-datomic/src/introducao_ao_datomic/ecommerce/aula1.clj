(ns introducao-ao-datomic.ecommerce.aula1
  (:require [datomic.api :as d]
            [introducao-ao-datomic.ecommerce.db :as db]
            [introducao-ao-datomic.ecommerce.model :as model]))

(def conn (db/abre-conexao))

(db/cria-schema conn)

(let [computador (model/novo-produto "Computador Novo", "/computador_novo", 2500.10M)]
  (d/transact conn [computador]))

; o banco no instante que executou a linha
(def db (d/db conn))

(d/q '[:find ?entidade
       :where [?entidade :produto/nome]] db)

(let [celular (model/novo-produto "Celular Caro", "/celular", 888888.10M)]
  (d/transact conn [celular]))

(d/q '[:find ?entidade
       :where [?entidade :produto/nome]] db)


(db/apaga-banco)