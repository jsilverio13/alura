(ns datomic_identidade_e_queries.ecommerce.model)

(defn novo-produto [nome slug preco]
  {:produto/nome  nome
   :produto/slug  slug
   :produto/preco preco})