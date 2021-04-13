using MongoDB.Driver;
using MongoDBDotNet.Examples.Models;

namespace MongoDBDotNet.Examples.Repositorio
{
    public class DataBaseLivros
    {
        public const string STRING_DE_CONEXAO = "mongodb://localhost:27017";
        public const string NOME_DA_BASE = "Biblioteca";
        public const string NOME_DA_COLECAO = "Livros";
        private readonly IMongoDatabase _baseDeDados;

        public IMongoClient Cliente { get; }

        public IMongoCollection<Livro> Livros
        {
            get { return _baseDeDados.GetCollection<Livro>(NOME_DA_COLECAO); }
        }

        public DataBaseLivros()
        {
            Cliente = new MongoClient(STRING_DE_CONEXAO);

            // acesso ao banco de dados

            _baseDeDados = Cliente.GetDatabase(NOME_DA_BASE);
        }
    }
}