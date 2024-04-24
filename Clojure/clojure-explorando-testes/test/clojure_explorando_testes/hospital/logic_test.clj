(ns clojure-explorando-testes.hospital.logic-test
  #_{:clj-kondo/ignore [:refer-all]}
  (:require [clojure.pprint :refer [pprint]]
            [clojure.test :refer :all]
            [clojure-explorando-testes.hospital.logic :refer :all]
            [clojure-explorando-testes.hospital.model :as h.model]
            [schema.core :as s]))


(pprint "Teste")
(pprint h.model/Hospital)
(pprint s/Str "teste")

