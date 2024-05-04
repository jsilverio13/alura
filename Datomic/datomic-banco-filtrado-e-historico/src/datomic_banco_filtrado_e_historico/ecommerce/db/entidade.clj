(ns datomic-banco-filtrado-e-historico.ecommerce.db.entidade
  (:require [clojure.walk :as walk]))

(defn dissoc-db-id [entidade]
  (if (map? entidade)
    (dissoc entidade :db/id)
    entidade))

(defn datomic-para-entidade [entidades]
  (walk/prewalk dissoc-db-id entidades))