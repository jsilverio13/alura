(ns datomic-schemas-regras.ecommerce.aula2

  (:require [clojure.pprint :refer [pprint]]
            [datomic-schemas-regras.ecommerce.db :as db]
            [datomic-schemas-regras.ecommerce.model :as model]
            [datomic.api :as d]
            [schema.core :as s]))

(s/set-fn-validation! true)
(db/apaga-banco!)
(def conn (db/abre-conexao!))
(db/cria-schema! conn)

(db/cria-dados-de-exemplo conn)

(pprint (db/todas-as-categorias (d/db conn)))
(pprint (db/todos-os-produtos (d/db conn)))

(def dama {:produto/nome  "Dama"
           :produto/slug  "/dama"
           :produto/preco 15.5M
           :produto/id    (model/uuid)})

(db/adiciona-ou-altera-produtos! conn [dama])
(pprint (db/um-produto (d/db conn) (:produto/id dama)))

(db/adiciona-ou-altera-produtos! conn [(assoc dama :produto/slug "/jogo-de-dama")])
(pprint (db/um-produto (d/db conn) (:produto/id dama)))

(db/adiciona-ou-altera-produtos! conn [(assoc dama :produto/preco 150.5M)])
(pprint (db/um-produto (d/db conn) (:produto/id dama)))

(defn atualiza-preco []
  (println "Atualizando preco\n")
  (let [produto (db/um-produto (d/db conn) (:produto/id dama))]
    (Thread/sleep 3000)
    (let [produto (assoc produto :produto/preco 999M)]
      (db/adiciona-ou-altera-produtos! conn [produto])
      (println "Preço atualizado\n"))
    produto))

(defn atualiza-slug []
  (println "Atualizando slug\n")
  (let [produto (db/um-produto (d/db conn) (:produto/id dama))]
    (Thread/sleep 3000)
    (let [produto (assoc produto :produto/slug "/jogo-de-dama-carinho")]
      (db/adiciona-ou-altera-produtos! conn [produto])
      (println "Slug atualizado\n"))
    produto))

(defn roda-transacoes [tx]
  (let [futuros (mapv #(future (%)) tx)]
    (pprint (map deref futuros))
    (println "Resultado final\n")
    (pprint (db/um-produto (d/db conn) (:produto/id dama)))))

(roda-transacoes [atualiza-preco atualiza-slug])

(defn atualiza-preco-inteligente []
  (println "Atualizando preco")
  (let [produto {:produto/id (:produto/id dama), :produto/preco 111M}]
    (db/adiciona-ou-altera-produtos! conn [produto])
    (println "Preco atualizado")
    produto))

(defn atualiza-slug-inteligente []
  (println "Atualizando preco")
  (let [produto {:produto/id (:produto/id dama), :produto/slug "/dama-com-slug-novo"}]
    (db/adiciona-ou-altera-produtos! conn [produto])
    (println "Slug atualizado")
    produto))

(roda-transacoes [atualiza-preco-inteligente atualiza-slug-inteligente])
