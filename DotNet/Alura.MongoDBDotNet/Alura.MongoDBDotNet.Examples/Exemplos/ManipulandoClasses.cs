using MongoDB.Driver;
using MongoDBDotNet.Examples.Models;
using System;
using System.Collections.Generic;

namespace MongoDBDotNet.Examples.Exemplos
{
    public static class ManipulandoClasses
    {
        public static void Execute()
        {
            var livro = new Livro
            {
                Titulo = "Sob a Redoma",
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

            string stringConexao = "mongodb://localhost:27017";
            IMongoClient cliente = new MongoClient(stringConexao);

            // acesso ao banco de dados

            var bancoDados = cliente.GetDatabase("Biblioteca");

            // acesso a coleção

            var colecao = bancoDados.GetCollection<Livro>("Livros");

            //incluindo documento

            colecao.InsertOne(livro);

            Console.WriteLine("Documento Incluido");

            Console.WriteLine("Pressione ENTER");
            Console.ReadKey();
        }
    }
}