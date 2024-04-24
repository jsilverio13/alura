(ns clojure-record-protocol-multi-method.hospital.logic
  (:require [clojure-record-protocol-multi-method.hospital.model :as h.model]))

(defn agora []
  (h.model/to-ms (java.util.Date.)))