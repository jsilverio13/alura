using MongoDBDotNet.Examples.Models;
using MongoDBDotNet.Examples.Repositorio;
using System;
using System.Collections.Generic;

namespace MongoDBDotNet.Examples.Exemplos
{
    public static class ManipulandoClassesExterna
    {
        public static void Execute()
        {
            var livro = new Livro
            {
                Titulo = "Star Wars",
                Autor = "Stephen King",
                Ano = 2012,
                Paginas = 699,
                Assunto = new List<string>
                {
                    "Ficção Cientifica",
                    "Ação",
                    "Aventura"
                }
            };

            var conexao = new DataBaseLivros();

            //incluindo documento

            conexao.Livros.InsertOne(livro);

            Console.WriteLine("Documento Incluido");

            Console.WriteLine("Pressione ENTER");
            Console.ReadKey();
        }
    }
}