using Alura.WebAPI.Model;
using Alura.WebAPI.WebApp.HttpClients;
using Alura.WebAPI.WebApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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
            var lista = await _api.GetListaLeituraAsync(tipo).ConfigureAwait(false);
            return lista.Livros;
        }

        public async Task<IActionResult> Index()
        {
            var model = new HomeViewModel
            {
                ParaLer = await ListaDoTipo(TipoListaLeitura.ParaLer).ConfigureAwait(false),
                Lendo = await ListaDoTipo(TipoListaLeitura.Lendo).ConfigureAwait(false),
                Lidos = await ListaDoTipo(TipoListaLeitura.Lidos).ConfigureAwait(false)
            };
            return View(model);
        }
    }
}