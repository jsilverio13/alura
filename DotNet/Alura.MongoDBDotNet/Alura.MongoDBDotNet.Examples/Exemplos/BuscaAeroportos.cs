using MongoDB.Driver;
using MongoDB.Driver.GeoJsonObjectModel;
using MongoDBDotNet.Examples.Models;
using MongoDBDotNet.Examples.Repositorio;

namespace MongoDBDotNet.Examples.Exemplos
{
    public static class BuscaAeroportos
    {
        public static void Execute()
        {
            var conexao = new DataBaseGeo();

            var ponto = new GeoJson2DGeographicCoordinates(-70.280359, 41.669334000000006);

            var localizacao = new GeoJsonPoint<GeoJson2DGeographicCoordinates>(ponto);

            var construtor = Builders<Aeroporto>.Filter;

            var condicao = construtor.NearSphere(x => x.loc, localizacao, 100000);

            var aeroportos = conexao.Aeroportos.Find(condicao).ToList();

            foreach (var aeroporto in aeroportos)
            {
                System.Console.WriteLine($"Nome: {aeroporto.name} Tipo: {aeroporto.type}");
            }
        }
    }
}