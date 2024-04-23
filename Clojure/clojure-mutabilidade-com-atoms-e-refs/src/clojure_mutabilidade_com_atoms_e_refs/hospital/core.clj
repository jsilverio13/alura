(ns clojure-mutabilidade-com-atoms-e-refs.hospital.core
  (:require [clojure-mutabilidade-com-atoms-e-refs.hospital.model :as h.model]
           [clojure.pprint :refer [pprint]]))

(let [hospital-do-jeff (h.model/novo-hospital)]
  (pprint hospital-do-jeff))

(pprint h.model/fila-vazia)