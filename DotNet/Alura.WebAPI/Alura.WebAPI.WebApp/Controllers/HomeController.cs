using Alura.WebAPI.Model;
using Alura.WebAPI.WebApp.HttpClients;
using Alura.WebAPI.WebApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Alura.WebAPI.WebApp.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly LivroApiClient _api;

        public HomeController(LivroApiClient api)
        {
            _api = api;
        }

        private async Task<IEnumerable<LivroApi>> ListaDoTipo(TipoListaLeitura tipo)
        {
            var lista = await _api.GetLeituraAsync(tipo).ConfigureAwait(false);

            return lista.Livros;
        }

        public async Task<IActionResult> Index()
        {
            string token = HttpContext.User.Claims.First(c => c.Type == "Token").Value;

            var model = new HomeViewModel
            {
                ParaLer = await ListaDoTipo(TipoListaLeitura.ParaLer),
                Lendo = await ListaDoTipo(TipoListaLeitura.Lendo),
                Lidos = await ListaDoTipo(TipoListaLeitura.Lidos)
            };

            return View(model);
        }
    }
}