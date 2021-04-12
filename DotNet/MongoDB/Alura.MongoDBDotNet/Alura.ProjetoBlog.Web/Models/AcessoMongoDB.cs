using MongoDB.Driver;

namespace Alura.ProjetoBlog.Web.Models
{
    public class AcessoMongoDB
    {
        public const string STRING_DE_CONEXAO = "mongodb://localhost:27017";
        public const string NOME_DA_BASE = "Blog";
        public const string NOME_DA_COLECAO_PUBLICACAO = nameof(Publicacoes);
        public const string NOME_DA_COLECAO_USUARIO = nameof(Usuarios);
        private readonly IMongoDatabase _baseDeDados;

        public IMongoClient Cliente { get; }

        public IMongoCollection<Usuario> Usuarios
        {
            get { return _baseDeDados.GetCollection<Usuario>(NOME_DA_COLECAO_USUARIO); }
        }

        public IMongoCollection<Publicacao> Publicacoes
        {
            get { return _baseDeDados.GetCollection<Publicacao>(NOME_DA_COLECAO_PUBLICACAO); }
        }

        public AcessoMongoDB()
        {
            Cliente = new MongoClient(STRING_DE_CONEXAO);

            // acesso ao banco de dados

            _baseDeDados = Cliente.GetDatabase(NOME_DA_BASE);
        }
    }
}