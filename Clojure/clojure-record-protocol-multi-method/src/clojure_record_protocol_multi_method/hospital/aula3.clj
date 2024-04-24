(ns clojure-record-protocol-multi-method.hospital.aula3
  (:require [clojure-record-protocol-multi-method.hospital.logic :as h.logic]
            [clojure.pprint :refer [pprint]]))

(defn carrega-paciente [id]
  (println "Carregando" id)
  (Thread/sleep 1000)
  {:id id, :carregado-em (h.logic/agora)})


(pprint (carrega-paciente 15))
(pprint (carrega-paciente 30))


(defn carrega-se-nao-existe
  [cache id carregadora]
  (if (contains? cache id)
    cache
    (let [paciente (carregadora id)]
      (assoc cache id paciente))))


(pprint (carrega-se-nao-existe {} , 15, carrega-paciente))
(pprint (carrega-se-nao-existe {15 {:id 15}}, 15, carrega-paciente))


(defprotocol Carregavel
  (carrega! [this id]))

(defrecord Cache
           [cache carregadora]
  Carregavel
  (carrega! [this id]
    (swap! cache carrega-se-nao-existe id carregadora)
    (get @cache id)))



(def pacientes (->Cache (atom {}), carrega-paciente))
(pprint pacientes)
(carrega! pacientes 15)
(carrega! pacientes 30)
(carrega! pacientes 15)