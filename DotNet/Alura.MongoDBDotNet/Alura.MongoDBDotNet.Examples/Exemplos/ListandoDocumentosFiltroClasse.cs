using MongoDB.Bson;
using MongoDB.Driver;
using MongoDBDotNet.Examples.Models;
using MongoDBDotNet.Examples.Repositorio;
using System;

namespace MongoDBDotNet.Examples.Exemplos
{
    public static class ListandoDocumentosFiltroClasse
    {
        public static void Execute()
        {
            var conexaoBiblioteca = new Connect();
            Console.WriteLine("Listando Documentos Machado de Assis");

            var construtor = Builders<Livro>.Filter;
            var condicao = construtor.Eq(x => x.Autor, "Machado de Assis");

            foreach (var doc in conexaoBiblioteca.Livros.Find(condicao).ToList())
            {
                Console.WriteLine(doc.ToJson());
            }

            Console.WriteLine("Fim da Lista");
            Console.WriteLine();

            Console.WriteLine("Listando Documentos Ano maior que a 1999");

            construtor = Builders<Livro>.Filter;
            condicao = construtor.Gte(x => x.Ano, 1999);

            foreach (var doc in conexaoBiblioteca.Livros.Find(condicao).ToList())
            {
                Console.WriteLine(doc.ToJson());
            }

            Console.WriteLine("Fim da Lista");
            Console.WriteLine();

            Console.WriteLine("Listando Documentos Ano maior que a 1999 e que mais 300 paginas");

            construtor = Builders<Livro>.Filter;
            condicao = construtor.Gte(x => x.Ano, 1999) & construtor.Gt(x => x.Paginas, 300);

            foreach (var doc in conexaoBiblioteca.Livros.Find(condicao).ToList())
            {
                Console.WriteLine(doc.ToJson());
            }

            Console.WriteLine("Fim da Lista");
            Console.WriteLine();

            Console.WriteLine("Listando Documentos Ficção");

            construtor = Builders<Livro>.Filter;
            condicao = construtor.AnyEq(x => x.Assunto, "Ficção Científica");

            foreach (var doc in conexaoBiblioteca.Livros.Find(condicao).ToList())
            {
                Console.WriteLine(doc.ToJson());
            }

            Console.WriteLine("Fim da Lista");
            Console.WriteLine();

            Console.ReadKey();
        }
    }
}