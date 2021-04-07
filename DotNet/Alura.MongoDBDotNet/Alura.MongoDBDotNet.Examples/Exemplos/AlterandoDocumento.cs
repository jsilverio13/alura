using MongoDB.Driver;
using MongoDBDotNet.Examples.Models;
using MongoDBDotNet.Examples.Repositorio;
using System;
using System.Linq;

namespace MongoDBDotNet.Examples.Exemplos
{
    public static class AlterandoDocumento
    {
        public static void Execute()
        {
            var conexaoBiblioteca = new DataBaseLivros();

            Console.WriteLine("Listando Documentos Guerra dos Tronos");

            var construtor = Builders<Livro>.Filter;
            var condicao = construtor.Eq(x => x.Titulo, "Guerra dos Tronos");

            foreach (var doc in conexaoBiblioteca.Livros.Find(condicao).ToList())
            {
                Console.WriteLine($"{doc.Titulo} - {doc.Autor} - {doc.Paginas} - {string.Join(',', doc.Assunto.ToArray())}");
                doc.Ano = 2000;
                doc.Paginas = 600;
                conexaoBiblioteca.Livros.ReplaceOne(condicao, doc);
            }

            Console.WriteLine("Fim da Lista");
            Console.WriteLine();

            Console.ReadKey();
        }
    }
}