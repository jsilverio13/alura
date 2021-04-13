using MongoDB.Bson;
using MongoDB.Driver;
using System;

namespace MongoDBDotNet.Examples.Exemplos
{
    public static class PrimeiroAcesso
    {
        public static void Execute()
        {
            var doc = new BsonDocument
            {
                { "Titulo", "Guerra dos Tronos" },
                {"Autor", "George R R Martin" },
                {"Ano", 1996 },
                {"Paginas", 856 },
                {"Assunto", new BsonArray{"Fantasia", "Ação"} }
            };

            Console.WriteLine(doc);  // acesso ao servidor do MongoDB

            string stringConexao = "mongodb://localhost:27017";
            IMongoClient cliente = new MongoClient(stringConexao);

            // acesso ao banco de dados

            var bancoDados = cliente.GetDatabase("Biblioteca");

            // acesso a coleção

            var colecao = bancoDados.GetCollection<BsonDocument>("Livros");

            //incluindo documento

            colecao.InsertOne(doc);

            Console.WriteLine("Documento Incluido");

            Console.WriteLine("Pressione ENTER");
            Console.ReadKey();
        }
    }
}