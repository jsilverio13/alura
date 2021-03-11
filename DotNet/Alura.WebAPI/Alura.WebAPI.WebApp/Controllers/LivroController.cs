using Alura.ListaLeitura.Modelos;
using Alura.WebAPI.WebApp.HttpClients;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace Alura.WebAPI.WebApp.Controllers
{
    [Authorize]
    public class LivroController : Controller
    {
        private readonly LivroApiClient _api;

        public LivroController(LivroApiClient api)
        {
            _api = api;
        }

        [HttpGet]
        public IActionResult Novo()
        {
            return View(new LivroUpload());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Novo(LivroUpload model)
        {
            if (ModelState.IsValid)
            {
                await _api.PostLivroAsync(model).ConfigureAwait(false);

                return RedirectToAction("Index", "Home");
            }
            return View(model);
        }

        [HttpGet]
        public async Task<IActionResult> ImagemCapa(int id)
        {
            using (var httpClient = new HttpClient { BaseAddress = new Uri("http://localhost:6000/api/") })
            {
                var img = await _api.GetCapaLivrosAsync(id).ConfigureAwait(false);

                if (img != null)
                {
                    return File(img, "image/png");
                }
                return File("~/images/capas/capa-vazia.png", "image/png");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Detalhes(int id)
        {
            using (var httpClient = new HttpClient { BaseAddress = new Uri("http://localhost:6000/api/") })
            {
                var livroApi = await _api.GetLivrosAsync(id).ConfigureAwait(false);

                if (livroApi == null)
                {
                    return NotFound();
                }

                return View(livroApi.ToUpload());
            }
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Detalhes(LivroUpload model)
        {
            if (ModelState.IsValid)
            {
                await _api.PutLivroAsync(model).ConfigureAwait(false);

                return RedirectToAction("Index", "Home");
            }
            return View(model);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Remover(int id)
        {
            var model = await _api.GetLivrosAsync(id).ConfigureAwait(false);

            if (model == null)
            {
                return NotFound();
            }
            await _api.DeleteLivroAsync(id).ConfigureAwait(false);

            return RedirectToAction("Index", "Home");
        }
    }
}