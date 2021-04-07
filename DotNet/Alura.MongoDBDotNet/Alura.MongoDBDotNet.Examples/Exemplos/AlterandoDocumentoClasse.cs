using MongoDB.Bson;
using MongoDB.Driver;
using MongoDBDotNet.Examples.Models;
using MongoDBDotNet.Examples.Repositorio;
using System;

namespace MongoDBDotNet.Examples.Exemplos
{
    public static class AlterandoDocumentoClasse
    {
        public static void Execute()
        {
            var conexaoBiblioteca = new DataBaseLivros();

            Console.WriteLine("Listando Documentos Guerra dos Tronos");

            var construtor = Builders<Livro>.Filter;
            var condicao = construtor.Eq(x => x.Titulo, "Guerra dos Tronos");

            foreach (var doc in conexaoBiblioteca.Livros.Find(condicao).ToList())
            {
                Console.WriteLine($"{doc.Titulo} - {doc.Autor} - {doc.Ano} - {doc.Paginas} - {string.Join(',', doc.Assunto.ToArray())}");
            }

            Console.WriteLine("Fim da Lista");
            Console.WriteLine();

            var construtorAlteracao = Builders<Livro>.Update;
            var condicaoAlteracao = construtorAlteracao.Set(x => x.Ano, 2004);
            conexaoBiblioteca.Livros.UpdateOne(condicao, condicaoAlteracao);

            Console.WriteLine("Registro Alterado");
            Console.WriteLine();

            Console.WriteLine("Listando Documentos Guerra dos Tronos");

            construtor = Builders<Livro>.Filter;
            condicao = construtor.Eq(x => x.Titulo, "Guerra dos Tronos");

            foreach (var doc in conexaoBiblioteca.Livros.Find(condicao).ToList())
            {
                Console.WriteLine($"{doc.Titulo} - {doc.Autor} - {doc.Ano} - {doc.Paginas} - {string.Join(',', doc.Assunto.ToArray())}");
            }

            Console.WriteLine("Fim da Lista");
            Console.WriteLine();

            Console.WriteLine("Listar os livros de Machado de Assis");
            construtor = Builders<Livro>.Filter;
            condicao = construtor.Eq(x => x.Autor, "Machado de Assis");

            foreach (var doc in conexaoBiblioteca.Livros.Find(condicao).SortBy(x => x.Titulo).Limit(5).ToList())
            {
                Console.WriteLine(doc.ToJson());
            }

            Console.WriteLine("Fim da Lista");
            Console.WriteLine("");
            Console.WriteLine("");

            construtorAlteracao = Builders<Livro>.Update;
            condicaoAlteracao = construtorAlteracao.Set(x => x.Autor, "M. Assis");
            conexaoBiblioteca.Livros.UpdateMany(condicao, condicaoAlteracao);

            Console.WriteLine("Registro Alterado");
            Console.WriteLine("");
            Console.WriteLine("Listar os livros de M. Assis");
            construtor = Builders<Livro>.Filter;
            condicao = construtor.Eq(x => x.Autor, "M. Assis");

            foreach (var doc in conexaoBiblioteca.Livros.Find(condicao).SortBy(x => x.Titulo).Limit(5).ToList())
            {
                Console.WriteLine(doc.ToJson());
            }

            Console.WriteLine("Fim da Lista");
            Console.WriteLine("");

            Console.ReadKey();
        }
    }
}