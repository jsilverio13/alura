using MongoDB.Bson;
using MongoDB.Driver;
using MongoDBDotNet.Examples.Repositorio;
using System;

namespace MongoDBDotNet.Examples.Exemplos
{
    public static class ListandoDocumentos
    {
        public static void Execute()
        {
            var conexaoBiblioteca = new Connect();
            Console.WriteLine("Listando Documentos");

            foreach (var doc in conexaoBiblioteca.Livros.Find(new BsonDocument()).ToList())
            {
                Console.WriteLine(doc.ToJson());
            }

            Console.WriteLine("Fim da Lista");
            Console.ReadKey();
        }
    }
}