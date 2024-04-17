(ns clojure-introducao-a-programacao-funcional.aula6)


(def pedido {:mochila {:quantidade 2, :preco 80}
             :camiseta {:quantidade 3, :preco 40}})

(defn imprime-e-15 [valor]
  (println "valor" (class valor) valor)
  15)

(println (map imprime-e-15 pedido))


;; (defn imprime-e-15 [chave valor]
;;   (println chave "e" valor)
;;   15)

;; (println (map imprime-e-15 pedido))


(defn imprime-e-15 [[chave valor]]
  (println chave "e" valor)
  15)

(println (map imprime-e-15 pedido))

(defn imprime-e-15 [[chave valor]]
  (println chave "e" valor)
  valor)

(println (map imprime-e-15 pedido))

(defn preco-por-produto [[chave valor]]
  (* (:quantidade valor) (:preco valor)))


(println (map preco-por-produto pedido))

(println (reduce + (map preco-por-produto pedido)))

(defn total-do-pedido
  [pedido]
  (reduce + (map preco-por-produto pedido)))

(println (total-do-pedido pedido))

(defn total-do-pedido
  [pedido]
  (->> pedido
       (map preco-por-produto)
       (reduce +)))

(println (total-do-pedido pedido))


(defn preco-total-do-produto [produto]
  (* (:quantidade produto) (:preco produto)))


(defn total-do-pedido
  [pedido]
  (->> pedido
       vals
       (map preco-total-do-produto)
       (reduce +)))

(println (total-do-pedido pedido))


(def pedido {:mochila {:quantidade 2, :preco 80}
             :camiseta {:quantidade 3, :preco 40}
             :chaveiro {:quantidade 1}})

(defn gratuito?
  [item]
  (<= (get item :preco 0) 0))

(println "Filtrando gratuitos")
(println (filter gratuito? (vals pedido)))


(defn gratuito?
  [[_ item]]
  (<= (get item :preco 0) 0))

(println "Filtrando gratuitos")
(println (filter gratuito? pedido))