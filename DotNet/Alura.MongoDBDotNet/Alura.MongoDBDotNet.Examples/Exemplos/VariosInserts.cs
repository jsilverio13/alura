using MongoDBDotNet.Examples.Models;
using MongoDBDotNet.Examples.Repositorio;
using System;
using System.Collections.Generic;

namespace MongoDBDotNet.Examples.Exemplos
{
    public static class VariosInserts
    {
        public static void Execute()
        {
            var conexaoBiblioteca = new DataBaseLivros();

            var Livros = new List<Livro>
            {
                ValoresLivro.IncluiValoresLivro("A Dança com os Dragões", "George R R Martin", 2011, 934, "Fantasia, Ação"),
                ValoresLivro.IncluiValoresLivro("A Tormenta das Espadas", "George R R Martin", 2006, 1276, "Fantasia, Ação"),
                ValoresLivro.IncluiValoresLivro("Memórias Póstumas de Brás Cubas", "Machado de Assis", 1915, 267, "Literatura Brasileira"),
                ValoresLivro.IncluiValoresLivro("Star Trek Portal do Tempo", "Crispin A C", 2002, 321, "Fantasia, Ação"),
                ValoresLivro.IncluiValoresLivro("Star Trek Enigmas", "Dedopolus Tim", 2006, 195, "Ficção Científica, Ação"),
                ValoresLivro.IncluiValoresLivro("Emília no Pais da Gramática", "Monteiro Lobato", 1936, 230, "Infantil, Literatura Brasileira, Didático"),
                ValoresLivro.IncluiValoresLivro("Chapelzinho Amarelo", "Chico Buarque", 2008, 123, "Infantil, Literatura Brasileira"),
                ValoresLivro.IncluiValoresLivro("20000 Léguas Submarinas", "Julio Verne", 1894, 256, "Ficção Científica, Ação"),
                ValoresLivro.IncluiValoresLivro("Primeiros Passos na Matemática", "Mantin Ibanez", 2014, 190, "Didático, Infantil"),
                ValoresLivro.IncluiValoresLivro("Saúde e Sabor", "Yeomans Matthew", 2012, 245, "Culinária, Didático"),
                ValoresLivro.IncluiValoresLivro("Goldfinger", "Iam Fleming", 1956, 267, "Espionagem, Ação"),
                ValoresLivro.IncluiValoresLivro("Da Rússia com Amor", "Iam Fleming", 1966, 245, "Espionagem, Ação"),
                ValoresLivro.IncluiValoresLivro("O Senhor dos Aneis", "J R R Token", 1948, 1956, "Fantasia, Ação")
            };

            conexaoBiblioteca.Livros.InsertMany(Livros);

            Console.WriteLine("Documento incluido");
            Console.WriteLine("Pressione ENTER");
            Console.ReadKey();
        }
    }
}