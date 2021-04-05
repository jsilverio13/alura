using MongoDB.Bson;
using MongoDB.Driver;
using MongoDBDotNet.Examples.Models;
using MongoDBDotNet.Examples.Repositorio;
using System;

namespace MongoDBDotNet.Examples.Exemplos
{
    public static class DeletandoDocumento
    {
        public static void Execute()
        {
            var conexaoBiblioteca = new Connect();

            Console.WriteLine("Buscar os livros de M. Assis");
            var construtor = Builders<Livro>.Filter;
            var condicao = construtor.Eq(x => x.Autor, "M. Assis");

            var listaLivros = conexaoBiblioteca.Livros.Find(condicao).ToList();
            foreach (var doc in listaLivros)
            {
                Console.WriteLine(doc.ToJson<Livro>());
            }
            Console.WriteLine("Fim da Lista");
            Console.WriteLine("");
            Console.WriteLine("");

            Console.WriteLine("Excluindo os livros");
            conexaoBiblioteca.Livros.DeleteMany(condicao);

            Console.WriteLine("Buscar os livros de M. Assis");
            construtor = Builders<Livro>.Filter;
            condicao = construtor.Eq(x => x.Autor, "M. Assis");

            listaLivros = conexaoBiblioteca.Livros.Find(condicao).ToList();
            foreach (var doc in listaLivros)
            {
                Console.WriteLine(doc.ToJson<Livro>());
            }
            Console.WriteLine("Fim da Lista");
            Console.WriteLine("");
            Console.ReadKey();
        }
    }
}