(ns clojure-schemas.hospital.aula2
  (:require [clojure.pprint :refer [pprint]]
            [schema.core :as s]))

(s/set-fn-validation! true)

;; (s/defrecord Paciente
;;              [id :- Long, nome :- s/Str])

;; (pprint (Paciente. "" "Jeff"))

(def Paciente
  "Schema de um paciente"
  {:id s/Num, :nome s/Str})

(pprint (s/explain Paciente))
(pprint (s/validate Paciente {:id 15, :nome "Jeff"}))


(s/defn novo-paciente :- Paciente
  [id :- s/Num, nome :- s/Str]
  {:id id, :nome nome})

(pprint (novo-paciente 15 "Jeff"))



; função pura, simples, facil de testar
(defn estritamente-positivo? [x]
  (> x 0))

;(def 
(s/pred estritamente-positivo?)
(def EstritamentePositivo (s/pred estritamente-positivo? 'estritamente-positivo))

(pprint (s/validate EstritamentePositivo 15))
;(pprint (s/validate EstritamentePositivo 0))
;(pprint (s/validate EstritamentePositivo -15))



#_{:clj-kondo/ignore [:redefined-var]}
(def Paciente
  "Schema de um paciente"
  {:id (s/constrained s/Int pos?), :nome s/Str})

(pprint (s/validate Paciente {:id 15, :nome "Jeff"}))