using MongoDB.Bson;
using MongoDB.Driver;
using MongoDBDotNet.Examples.Repositorio;
using System;

namespace MongoDBDotNet.Examples.Exemplos
{
    public static class ListandoDocumentosFiltro
    {
        public static void Execute()
        {
            var conexaoBiblioteca = new Connect();
            Console.WriteLine("Listando Documentos");

            var filtro = new BsonDocument
            {
                {"Autor", "Machado de Assis"}
            };

            foreach (var doc in conexaoBiblioteca.Livros.Find(filtro).ToList())
            {
                Console.WriteLine(doc.ToJson());
            }

            Console.WriteLine("Fim da Lista");
            Console.ReadKey();
        }
    }
}