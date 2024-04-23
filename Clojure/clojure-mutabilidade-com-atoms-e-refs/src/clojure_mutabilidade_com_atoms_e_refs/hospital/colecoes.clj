(ns clojure-mutabilidade-com-atoms-e-refs.hospital.colecoes)

(defn test-vetor []
  (let [espera [111 222]]
    (println espera)
    (println (conj espera 333))
    (println (conj espera 444))
    (println (pop espera))))


(test-vetor)


(defn testa-lista []
  (let [espera '(111 222)]
    (println espera)
    (println (conj espera 333))
    (println (conj espera 444))
    (println (pop espera))))


(testa-lista)