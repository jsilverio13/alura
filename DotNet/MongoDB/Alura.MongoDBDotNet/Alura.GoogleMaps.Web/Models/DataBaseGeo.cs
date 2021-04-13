using MongoDB.Driver;

namespace Alura.GoogleMaps.Web.Models
{
    public class DataBaseGeo
    {
        public const string STRING_DE_CONEXAO = "mongodb://localhost:27017";
        public const string NOME_DA_BASE = "geo";
        public const string NOME_DA_COLECAO_AIRPORTS = "airports";
        public const string NOME_DA_COLECAO_STATES = "States";
        private readonly IMongoDatabase _baseDeDados;

        public IMongoClient Client { get; }

        public IMongoCollection<Aeroporto> Aeroportos
        {
            get { return _baseDeDados.GetCollection<Aeroporto>(NOME_DA_COLECAO_AIRPORTS); }
        }

        public DataBaseGeo()
        {
            Client = new MongoClient(STRING_DE_CONEXAO);

            // acesso ao banco de dados

            _baseDeDados = Client.GetDatabase(NOME_DA_BASE);
        }
    }
}