(ns clojure-colecoes-no-dia-a-dia.aula4
  (:require [clojure-colecoes-no-dia-a-dia.db :as l.db]
            [clojure-colecoes-no-dia-a-dia.logic :as l.logic]))

(let [resumo  (l.logic/resumo-por-usuario (l.db/todos-os-pedidos))]
  (println "Resumo" resumo)
  (println "Ordenado" (sort-by :preco-total resumo))
  (println "Ordenado ao contrário" (reverse (sort-by :preco-total resumo)))
  (println "Ordenado por id"  (sort-by :usuario-id resumo)))


(defn resumo-por-usuario-ordenado [pedidos]
  (->> pedidos
       l.logic/resumo-por-usuario
       (sort-by :preco-total)
       reverse))

(let [pedidos (l.db/todos-os-pedidos)
      resumo (resumo-por-usuario-ordenado pedidos)]
  (println "Resumo" resumo)
  (println "Primeiro" (first resumo))
  (println "Second" (second resumo))
  (println "Resto" (rest resumo))
  (println "Total" (count resumo))
  (println "Class" (class resumo))
  (println "nth 1" (nth resumo 1))
  (println "get 1" (get resumo 1))
  (println "take" (take 2 resumo)))


(defn top-2 [resumo]
  (take 2 resumo))

(let [pedidos (l.db/todos-os-pedidos)
      resumo (resumo-por-usuario-ordenado pedidos)]
  (println "Resumo" resumo)
  (println "Top-2" (top-2 resumo)))

(let [pedidos (l.db/todos-os-pedidos)
      resumo (resumo-por-usuario-ordenado pedidos)]
  (println "> 500 filter" (filter #(> (:preco-total %) 500) resumo))
  (println "> 500 filter not empty" (not (empty? (filter #(> (:preco-total %) 500) resumo))))
  (println "> 500 some" (some #(> (:preco-total %) 500) resumo)))

