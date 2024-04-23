(ns clojure-mutabilidade-com-atoms-e-refs.hospital.aula3
  (:require [clojure-mutabilidade-com-atoms-e-refs.hospital.logic :as h.logic]
            [clojure-mutabilidade-com-atoms-e-refs.hospital.model :as h.model]
            [clojure.pprint :refer [pprint]]))


(defn testa-atomao []
  (let [hospital-silverio (atom {:espera h.model/fila-vazia})]
    (println hospital-silverio)
    (pprint hospital-silverio)
    (pprint (deref hospital-silverio))
    (pprint @hospital-silverio)

    ; nao eh assim que eu altero conteudo dentro de um atomo
    (pprint (assoc @hospital-silverio :laboratorio1 h.model/fila-vazia))
    (pprint @hospital-silverio)

    ; essa é (uma das) a maneira de alterar conteudo dentro deum atomo
    (swap! hospital-silverio assoc :laboratorio1 h.model/fila-vazia)
    (pprint @hospital-silverio)

    (swap! hospital-silverio assoc :laboratorio2 h.model/fila-vazia)
    (pprint @hospital-silverio)

    ; update tradicional imutavel, com dereferencia, que nao trara efeito
    ; (update @hospital-silverio :laboratorio1 conj "111")

    ; indo pra swap
    (swap! hospital-silverio update :laboratorio1 conj "111")
    (pprint hospital-silverio)))

(testa-atomao)


(defn chega-em-malvado! [hospital pessoa]
  (swap! hospital h.logic/chega-em-pausado-logando :espera pessoa)
  (println "apos inserir" pessoa))

(defn simula-um-dia-em-paralelo
  []
  (let [hospital (atom (h.model/novo-hospital))]
    (.start (Thread. (fn [] (chega-em-malvado! hospital "111"))))
    (.start (Thread. (fn [] (chega-em-malvado! hospital "222"))))
    (.start (Thread. (fn [] (chega-em-malvado! hospital "333"))))
    (.start (Thread. (fn [] (chega-em-malvado! hospital "444"))))
    (.start (Thread. (fn [] (chega-em-malvado! hospital "555"))))
    (.start (Thread. (fn [] (chega-em-malvado! hospital "666"))))
    (.start (Thread. (fn [] (Thread/sleep 8000)
                       (pprint hospital))))))

; forçando situações de retry
(simula-um-dia-em-paralelo)
