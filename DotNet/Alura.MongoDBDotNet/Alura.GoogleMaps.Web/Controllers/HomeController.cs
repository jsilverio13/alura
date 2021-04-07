using Alura.GoogleMaps.Web.Geocoding;
using Alura.GoogleMaps.Web.Models;
using MongoDB.Driver;
using MongoDB.Driver.GeoJsonObjectModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Alura.GoogleMaps.Web.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            //coordenadas quaisquer para mostrar o mapa
            var coordenadas = new Coordenada("São Paulo", "-23.64340873969638", "-46.730219057147224");
            return View(coordenadas);
        }

        public async Task<JsonResult> Localizar(HomeViewModel model)
        {
            Debug.WriteLine(model);

            //Captura a posição atual e adiciona a lista de pontos
            Coordenada coordLocal = ObterCoordenadasDaLocalizacao(model.Endereco);
            var aeroportosProximos = new List<Coordenada>();
            aeroportosProximos.Add(coordLocal);

            //Captura a latitude e longitude locais
            double lat = Convert.ToDouble(coordLocal.Latitude.Replace(".", ","));
            double lon = Convert.ToDouble(coordLocal.Longitude.Replace(".", ","));

            //Testa o tipo de aeroporto que será usado na consulta
            string tipoAero = "";

            if (model.Tipo == TipoAeroporto.Internacionais)
            {
                tipoAero = "International";
            }
            if (model.Tipo == TipoAeroporto.Municipais)
            {
                tipoAero = "Municipal";
            }

            //Captura o valor da distancia
            int distancia = model.Distancia * 1000;

            //Conecta MongoDB
            var conexaoAeroporto = new DataBaseGeo();

            //Configura o ponto atual no mapa
            var ponto = new GeoJson2DGeographicCoordinates(lon, lat);
            var localizacao = new GeoJsonPoint<GeoJson2DGeographicCoordinates>(ponto);

            // filtro

            var construtor = Builders<Aeroporto>.Filter;
            var filtro_builder = tipoAero?.Length == 0 ? construtor.NearSphere(x => x.loc, localizacao, distancia) : construtor.NearSphere(x => x.loc, localizacao, distancia) & construtor.Eq(x => x.type, tipoAero);

            // Captura a lista
            var listaAeroportos = await conexaoAeroporto.Aeroportos.Find(filtro_builder).ToListAsync().ConfigureAwait(false);

            // Escreve os pontos
            foreach (var doc in listaAeroportos)
            {
                var aero = new Coordenada(doc.name,
                    Convert.ToString(doc.loc.Coordinates.Latitude).Replace(",", "."),
                    Convert.ToString(doc.loc.Coordinates.Longitude).Replace(",", "."));
                aeroportosProximos.Add(aero);
            }

            return Json(aeroportosProximos);
        }

        private static Coordenada ObterCoordenadasDaLocalizacao(string endereco)
        {
            string url = $"http://maps.google.com/maps/api/geocode/json?address={endereco}";
            Debug.WriteLine(url);

            var coord = new Coordenada("Não Localizado", "-10", "-10");
            using (var webClient = new WebClient())
            {
                var response = webClient.DownloadString(url);
                var googleGeocode = JsonConvert.DeserializeObject<GoogleGeocodeResponse>(response);

                if (googleGeocode.status == "OK")
                {
                    coord.Nome = googleGeocode.results[0].formatted_address;
                    coord.Latitude = googleGeocode.results[0].geometry.location.lat;
                    coord.Longitude = googleGeocode.results[0].geometry.location.lng;
                }

                return coord;
            }
        }
    }
}