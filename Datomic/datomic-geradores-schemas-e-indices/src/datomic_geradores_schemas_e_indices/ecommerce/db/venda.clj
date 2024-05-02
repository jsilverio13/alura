(ns datomic-geradores-schemas-e-indices.ecommerce.db.venda
  (:require [datomic-geradores-schemas-e-indices.ecommerce.model :as model]
            [datomic.api :as d]
            [datomic-geradores-schemas-e-indices.ecommerce.db.entidade :as db.entidade]))

(defn adiciona!
  [conn produto-id quantidade]
  (let [id (model/uuid)]
    (d/transact conn [{:db/id "venda"
                       :venda/produto [:produto/id produto-id]
                       :venda/quantidade quantidade
                       :venda/id id
                       :venda/situacao "nova"}])
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



(defn todas-nao-canceladas [conn]
  (db.entidade/datomic-para-entidade
   (d/q '[:find ?id
          :where
          [?venda :venda/id ?id]
          [?venda :venda/situacao ?situacao]
          [(not= ?situacao "cancelada")]]
        conn)))

(defn todas-inclusive-canceladas [conn]
  (d/q '[:find ?id
         :where [?venda :venda/id ?id _ true]]
       conn))

(defn todas-canceladas [conn]
  (d/q '[:find ?id
         :where
         [?venda :venda/id ?id]
         [?venda :venda/situacao "cancelada"]]
       conn))

(defn altera-situacao! [conn venda-id situacao]
  (d/transact conn
              [{:venda/id  venda-id
                :venda/situacao situacao}]))

(defn historico [conn venda-id]
  (->> (d/q '[:find ?instante ?situacao
              :in $ ?id
              :where
              [?venda :venda/id ?id]
              [?venda :venda/situacao ?situacao ?tx true]
              [?tx :db/txInstant ?instante]]
            (d/history conn) venda-id)
       (sort-by first)))


(defn historico-geral [conn instanta-desde]
  (let [filtrado (d/since conn instanta-desde)]
    (->> (d/q '[:find ?instante ?situacao ?id
                :in $ $filtrado
                :where
                [$ ?venda :venda/id ?id]
                [$filtrado ?venda :venda/situacao ?situacao ?tx]
                [$filtrado ?tx :db/txInstant ?instante]]
              conn filtrado)
         (sort-by first))))

(defn cancela! [conn venda-id]
  (altera-situacao! conn venda-id "cancelada"))