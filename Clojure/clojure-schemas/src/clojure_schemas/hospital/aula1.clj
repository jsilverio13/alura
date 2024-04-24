(ns clojure-schemas.hospital.aula1
  (:require [clojure.pprint :refer [pprint]] [schema.core :as s]))

(defn adiciona-paciente
  [pacientes, paciente]
  (if-let [id (:id paciente)]
    (assoc pacientes id paciente)
    (throw (ex-info "Paciente não possui id" {:paciente paciente}))))

(defn adiciona-visita [visitas, paciente, novas-visitas]
  (if (contains? visitas paciente)
    (update visitas paciente concat novas-visitas)
    (assoc visitas paciente novas-visitas)))


(defn imprime-relatorio-de-paciente [visitas, paciente]
  (println "Visitas do paciente" paciente "são" (get visitas paciente)))

(defn testa-uso-de-pacientes []
  (let [jefferson {:id 15, :nome "Jefferson"}
        jefferson1 {:id 20, :nome "Jefferson1"}
        jefferson2 {:id 25, :nome "Jefferson2"}
        jefferson3 {:id 30, :nome "Jefferson3"}
        pacientes (reduce adiciona-paciente {} [jefferson, jefferson1, jefferson2, jefferson3])
        visitas {}
        visitas (adiciona-visita visitas 15 ["01/01/2019"])
        visitas (adiciona-visita visitas 20 ["01/01/2019"])
        visitas (adiciona-visita visitas 25 ["01/01/2019"])
        visitas (adiciona-visita visitas 15 ["02/01/2019"])]
    (pprint pacientes)
    (pprint visitas)
    (imprime-relatorio-de-paciente visitas 15)))


(testa-uso-de-pacientes)

(pprint (s/validate Long 15))
; (pprint (s/validate Long "Jeff"))
; (pprint (s/validate Long [15]))

(s/set-fn-validation! true)
(s/defn teste-simples [x :- Long]
  (println x))

(teste-simples 30)
; (teste-simples "Jeff")

(s/defn novo-paciente
  [id :- Long, nome :- s/Str]
  {:id id, :nome nome})

(pprint (novo-paciente 15 "Guilherme"))
; (pprint (novo-paciente "Guilherme" 15))