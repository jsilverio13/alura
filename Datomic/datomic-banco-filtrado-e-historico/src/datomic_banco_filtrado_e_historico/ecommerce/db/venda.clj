(ns datomic-banco-filtrado-e-historico.ecommerce.db.venda
  (:require [datomic-banco-filtrado-e-historico.ecommerce.model :as model]
            [datomic.api :as d]))

(defn adiciona!
  [conn produto-id quantidade]
  (let [id (model/uuid)]
    (d/transact conn [{:db/id "venda"
                       :venda/produto [:produto/id produto-id]
                       :venda/quantidade quantidade
                       :venda/id id}])
    id))

(defn- intante-da-venda [conn venda-id]
  (d/q '[:find ?instante .
         :in $ ?id
         :where
         [_   :venda/id     ?id ?tx true]
         [?tx :db/txInstant ?instante]]
       conn venda-id))


(defn custo [conn venda-id]
  (let [instante (intante-da-venda conn venda-id)]
    (d/q '[:find (sum ?preco-por-produto) .
           :in $ ?id
           :where
           [?venda :venda/id ?id]
           [?venda :venda/quantidade ?quantidade]
           [?venda :venda/produto ?produto]
           [?produto :produto/preco ?preco]
           [(* ?preco ?quantidade) ?preco-por-produto]]
         (d/as-of conn instante) venda-id)))