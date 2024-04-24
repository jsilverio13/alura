(ns clojure-explorando-testes.hospital.model
  (:require [schema.core :as s]))

(def fila-vazia clojure.lang.PersistentQueue/EMPTY)

#_{:clj-kondo/ignore [:clojure-lsp/unused-public-var]}
(defn novo-hospital []
  {:espera       fila-vazia
   :laboratorio1 fila-vazia
   :laboratorio2 fila-vazia
   :laboratorio3 fila-vazia})

#_{:clj-kondo/ignore [:clojure-lsp/unused-public-var]}
(defn novo-departamento []
  fila-vazia)

(s/def PacienteID s/Str)
(s/def Departamento (s/queue PacienteID))
#_{:clj-kondo/ignore [:clojure-lsp/unused-public-var]}
(s/def Hospital {s/Keyword Departamento})

; só ilustrativos para a aula
;(s/validate PacienteID "Jeff")
;(s/validate PacienteID 15)
;(s/validate Departamento (conj fila-vazia "Jeff" "Ana"))
;(s/validate Hospital {:espera (conj fila-vazia "Jeff" "Ana")})