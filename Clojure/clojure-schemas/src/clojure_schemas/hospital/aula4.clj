(ns clojure-schemas.hospital.aula4
  (:require [clojure.pprint :refer [pprint]]
            [schema.core :as s]))

(s/set-fn-validation! true)

(def PosInt (s/pred pos-int? 'inteiro-positivo))
(def Plano [s/Keyword])
(def Paciente
  {:id                          PosInt,
   :nome                        s/Str,
   :plano                       Plano,
   (s/optional-key :nascimento) s/Str})

(pprint (s/validate Paciente {:id 15, :nome "Jeff", :plano [:raio-x, :ultrasom]}))
(pprint (s/validate Paciente {:id 15, :nome "Jeff", :plano [:raio-x]}))
(pprint (s/validate Paciente {:id 15, :nome "Jeff", :plano []}))
(pprint (s/validate Paciente {:id 15, :nome "Jeff", :plano nil}))
(pprint (s/validate Paciente {:id 15, :nome "Jeff", :plano [], :nascimento "18/9/1981"}))

                                   ; esse é um outro tipo de uso de mapas no mundo real
                                   ; Pacientes
                                   ; { 15 {PACIENTE} 32 {PACIENTE} }
(def Pacientes
  {PosInt Paciente})

(pprint (s/validate Pacientes {}))

(let [jeff {:id 15, :nome "Jeff", :plano [:raio-x]}
      ana {:id 20, :nome "Ana", :plano []}]
  (pprint (s/validate Pacientes {15 jeff}))
  (pprint (s/validate Pacientes {15 jeff, 20 ana})))

;(pprint (s/validate Pacientes {-15 Jeff}))
;(pprint (s/validate Pacientes {15 15}))
;(pprint (s/validate Pacientes {15 {:id 15, :nome "Jeff"}}))