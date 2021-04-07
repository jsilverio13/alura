using MongoDB.Driver;
using MongoDBDotNet.Examples.Models;
using MongoDBDotNet.Examples.Repositorio;
using System;
using System.Linq;

namespace MongoDBDotNet.Examples.Exemplos
{
    public static class ListandoDocumentosOrdenado
    {
        public static void Execute()
        {
            var conexaoBiblioteca = new DataBaseLivros();

            Console.WriteLine("Listando Documentos Maior 100 paginas");

            var construtor = Builders<Livro>.Filter;
            var condicao = construtor.Gte(x => x.Paginas, 100);

            foreach (var doc in conexaoBiblioteca.Livros.Find(condicao).SortBy(x => x.Titulo).ToList())
            {
                Console.WriteLine($"{doc.Titulo} - {doc.Autor} - {doc.Paginas} - {string.Join(',', doc.Assunto.ToArray())}");
            }

            Console.WriteLine("Fim da Lista");
            Console.WriteLine();

            Console.ReadKey();
        }
    }
}