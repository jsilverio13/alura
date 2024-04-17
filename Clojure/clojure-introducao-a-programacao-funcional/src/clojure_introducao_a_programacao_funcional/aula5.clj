(ns clojure-introducao-a-programacao-funcional.aula5)

(def estoque {"Mochila" 10 "Camiseta" 5})
(println estoque)

(def estoque {"Mochila" 10, "Camiseta" 5})
(println estoque)

(def estoque {"Mochila" 10
              "Camiseta" 5})
(println estoque)

(println "Temos" (count estoque) "elementos")
(println "Chaves são:" (keys estoque))
(println "Valores são:" (vals estoque))

; keyword
; :mochila

(def estoque {:mochila 10
              :camiseta 5})

(println (assoc estoque :cadeira 3))
(println estoque)
(println (assoc estoque :mochila 1))

(println (update estoque :mochila inc))

(defn tira-um
  [valor]
  (println "tirando um de" valor)
  (- valor 1))

(println (update estoque :mochila tira-um))


(println estoque)
(println (update estoque :mochila tira-um))
(println estoque)
(println (update estoque :mochila #(- % 3)))


(println (dissoc estoque :mochila))


(def pedido {:mochila {:quantidade 2, :preco 80}
             :camiseta {:quantidade 3, :preco 40}})


(println "\n\n\n")
(println pedido)

(def pedido (assoc pedido :chaveiro {:quantidade 1, :preco 10}))
(println pedido)
(println (pedido :mochila))
(println (get pedido :mochila))
(println (get pedido :cadeira {}))
(println (:mochila pedido))
(println (:cadeira pedido {}))


(println (:quantidade (:mochila pedido)))

; THREADING
(println (-> pedido
    :mochila
    :quantidade))
(println (update-in pedido [:mochila :quantidade] inc))

(-> pedido
    :mochila ,,,
    :quantidade ,,, 
    println ,,,)
