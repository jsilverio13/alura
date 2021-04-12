using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;
using System.Linq;

namespace MongoDBDotNet.Examples.Models
{
    public class Livro
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Titulo { get; set; }

        public string Autor { get; set; }
        public int Ano { get; set; }
        public int Paginas { get; set; }
        public List<string> Assunto { get; set; }
    }

    public static class ValoresLivro
    {
        public static Livro IncluiValoresLivro(string titulo, string autor, int ano, int paginas, string assuntos) => new Livro
        {
            Titulo = titulo,
            Autor = autor,
            Ano = ano,
            Paginas = paginas,
            Assunto = assuntos.Split(',').ToList()
        };
    }
}