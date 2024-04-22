(ns clojure-colecoes-no-dia-a-dia.aula1)

(map println ["daniela" "guilherme" "carlos" "paulo" "lucia" "ana"])

(println (first ["daniela" "guilherme" "carlos" "paulo" "lucia" "ana"]))
(println (rest ["daniela" "guilherme" "carlos" "paulo" "lucia" "ana"]))
(println (next ["daniela" "guilherme" "carlos" "paulo" "lucia" "ana"]))
(println (rest []))
(println (next []))
(println (seq []))
(println (seq [1 2 3 4]))

(println "\n\n\n MEU MAPA")


(defn meu-mapa
  [funcao sequencia]
  (let [primeiro (first sequencia)]
    (funcao primeiro)
    (meu-mapa funcao (rest sequencia))))

(defn meu-mapa
  [funcao sequencia]
  (let [primeiro (first sequencia)]
    (if primeiro
      (do
        (funcao primeiro)
        (meu-mapa funcao (rest sequencia))))))


(defn meu-mapa
  [funcao sequencia]
  (let [primeiro (first sequencia)]
    (if (not (nil? primeiro))
      (do
        (funcao primeiro)
        (recur funcao (rest sequencia))))))

(meu-mapa println ["daniela" "guilherme" "carlos" "paulo" "lucia" "ana"])
(meu-mapa println ["daniela" false "guilherme" "carlos" "paulo" "lucia" "ana"])
(meu-mapa println [])
(meu-mapa println nil)
 

