(ns clojure-mutabilidade-com-atoms-e-refs.hospital.aula1 (:use [clojure pprint])
    (:require [clojure-mutabilidade-com-atoms-e-refs.hospital.logic :as h.logic]
              [clojure-mutabilidade-com-atoms-e-refs.hospital.model :as h.model]))


(defn simula-um-dia []
    ; root binding
  (def hospital (h.model/novo-hospital))
  (def hospital (h.logic/chega-em hospital :espera "111"))
  (def hospital (h.logic/chega-em hospital :espera "222"))
  (def hospital (h.logic/chega-em hospital :espera "333"))
  (pprint hospital)

  (def hospital (h.logic/chega-em hospital :espera "444"))
  (def hospital (h.logic/chega-em hospital :laboratorio3 "555"))
  (pprint hospital)

  (def hospital (h.logic/atende hospital :laboratorio1))
  (def hospital (h.logic/atende hospital :espera))
  (def hospital (h.logic/chega-em hospital :espera "666"))
  (def hospital (h.logic/chega-em hospital :espera "777"))
  (def hospital (h.logic/chega-em hospital :espera "888"))
  (pprint hospital))

;(simula-um-dia)

(defn chega-em-def [pessoa]
  (def hospital (h.logic/chega-em hospital :espera pessoa))
  (println "após inserir" pessoa))

(defn simula-um-dia-em-paralelo
  []
  (def hospital (h.model/novo-hospital))
  (.start (Thread. (fn [] (chega-em-def "111"))))
  (.start (Thread. (fn [] (chega-em-def "222"))))
  (.start (Thread. (fn [] (chega-em-def "333"))))
  (.start (Thread. (fn [] (chega-em-def "444"))))
  (.start (Thread. (fn [] (chega-em-def "555"))))
  (.start (Thread. (fn [] (chega-em-def "666"))))
  (.start (Thread. (fn [] (Thread/sleep 400)
                     (pprint hospital)))))


(simula-um-dia-em-paralelo)