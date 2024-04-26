(ns clojure-property-based-test.core
  (:require [clojure-property-based-test.hospital.model :as h.model]
            [clojure.pprint :refer [pprint]]
            [clojure.test.check.generators :as gen]
            [schema-generators.generators :as g]))

; usando virgula somente para deixar claro a QUANTIDADE DE SAMPLES
(println (gen/sample gen/boolean, 100))
(println (gen/sample gen/small-integer, 100))
(println (gen/sample gen/string))
(println (gen/sample gen/string-alphanumeric, 100))

; não usei virgula de proposito tambem para indicar os parametros do vetor
; so pra ficar claro educacionalmente, na pratica, arrancaria as virgulas
(println (gen/sample (gen/vector gen/small-integer 15), 100))
(println (gen/sample (gen/vector gen/small-integer 1 5), 100))
(println (gen/sample (gen/vector gen/small-integer), 100))

; o generators do schema deduz generators a partir do schema
(println (g/sample 10 h.model/PacienteID))
(pprint (g/sample 10 h.model/Departamento))
(pprint (g/sample 10 h.model/Hospital))
(println "gerando com generate")
(pprint (g/generate h.model/Hospital))