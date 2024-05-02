(ns datomic-geradores-schemas-e-indices.ecommerce.db.categoria
  (:require [datomic-geradores-schemas-e-indices.ecommerce.db.entidade :as db.entidade]
            [datomic-geradores-schemas-e-indices.ecommerce.model :as model]
            [datomic.api :as d]
            [schema.core :as s]))

(defn db-adds-de-atribuicao-de-categorias [produtos categoria]
  (reduce (fn [db-adds produto] (conj db-adds [:db/add
                                               [:produto/id (:produto/id produto)]
                                               :produto/categoria
                                               [:categoria/id (:categoria/id categoria)]]))
          []
          produtos))

(defn atribui! [conn produtos categoria]
  (let [a-transacionar (db-adds-de-atribuicao-de-categorias produtos categoria)]
    (d/transact conn a-transacionar)))

(s/defn adiciona! [conn, categorias :- [model/Categoria]]
  (d/transact conn categorias))

(s/defn todas :- [model/Categoria] [db]
  (db.entidade/datomic-para-entidade
   (d/q '[:find [(pull ?categoria [*]) ...]
          :where [?categoria :categoria/id]]
        db)))