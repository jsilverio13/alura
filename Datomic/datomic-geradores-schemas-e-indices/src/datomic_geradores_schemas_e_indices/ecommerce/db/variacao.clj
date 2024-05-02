(ns datomic-geradores-schemas-e-indices.ecommerce.db.variacao
  (:require [datomic-geradores-schemas-e-indices.ecommerce.model :as model]
            [datomic.api :as d]
            [schema.core :as s]))

(s/defn adiciona!
  [conn , produto-id :- java.util.UUID, variacao :- s/Str, preco :- BigDecimal]
  (d/transact conn [{:db/id "variacao-temp"
                     :variacao/nome variacao
                     :variacao/preco preco
                     :variacao/id (model/uuid)}
                    {:produto/id produto-id
                     :produto/variacao "variacao-temp"}]))
