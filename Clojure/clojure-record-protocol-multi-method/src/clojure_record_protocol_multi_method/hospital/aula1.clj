(ns clojure-record-protocol-multi-method.hospital.aula1
  (:require [clojure.pprint :refer [pprint]]))


(defn adiciona-paciente
  [pacientes paciente]
  (if-let [id (:id paciente)]
    (assoc pacientes id paciente)
    (throw (ex-info "Paciente não possui id" {:paciente paciente}))))

(defn teste-uso-de-pacientes []
  (let [pacientes {}
        jefferson {:id 15 :nome "Jefferson" :nascimento "13/12/1994"}
        jefferson1 {:id 16 :nome "Jefferson1" :nascimento "13/12/1994"}
        jefferson2 {:nome "Jefferson2" :nascimento "13/12/1994"}]
    (pprint (adiciona-paciente pacientes jefferson))
    (pprint (adiciona-paciente pacientes jefferson1))
    (pprint (adiciona-paciente pacientes jefferson2))))


; (teste-uso-de-pacientes)

(defrecord Paciente [id, ^String nome, nascimento])

(pprint (->Paciente 15 "Jefferson" "13/12/1994"))
(pprint (Paciente. 15 "Jefferson" "13/12/ 1994"))
(pprint (map->Paciente  {:id 15, :nome "Jefferson", :nascimento "13/12/1994"}))

(let [jefferson (->Paciente 15 "Jefferson" "13/12/1994")]
  (println (:id jefferson))
  (println (vals jefferson))
  (println (class jefferson))
  (println (record? jefferson))
  (println (.nome jefferson)))

(pprint (map->Paciente {:id 15, :nome "Jefferson", :nascimento "13/12/1994" :rg "2222222"}))
;(pprint (Paciente. "Jefferson"  "13/12/1994"))
(pprint (Paciente. nil "Jefferson"  "13/12/1994"))
(pprint (map->Paciente {:nome "Jefferson", :nascimento "13/12/1994" :rg "2222222"}))

(pprint (assoc (Paciente. nil "Jefferson"  "13/12/1994") :id 38))
(pprint (class (assoc (Paciente. nil "Jefferson"  "13/12/1994") :id 38)))


; Thread/sleep


(pprint (= (->Paciente 15 "Jefferson" "13/12/1994") (->Paciente 15 "Jefferson" "13/12/1994")))
(pprint (= (->Paciente 153 "Jefferson" "13/12/1994") (->Paciente 15 "Jefferson" "13/12/1994")))