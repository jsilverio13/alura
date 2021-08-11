using Alura.LeilaoOnline.Core;
using Alura.LeilaoOnline.Dados;
using Alura.LeilaoOnline.WebApp.Extensions;
using Alura.LeilaoOnline.WebApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace Alura.LeilaoOnline.WebApp.Controllers
{
    public class AutenticacaoController : Controller
    {
        private readonly IRepositorio<Usuario> _repo;

        public AutenticacaoController(IRepositorio<Usuario> repositorio)
        {
            _repo = repositorio;
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Login(LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var usuario = _repo.Todos.FirstOrDefault(u => u.Email == model.Login && u.Senha == model.Password);
                if (usuario != null)
                {
                    usuario = _repo.BuscarPorId(usuario.Id);
                    //autenticar
                    HttpContext.Session.Set("usuarioLogado", usuario);

                    return RedirectToAction("Index", usuario.Interessada == null ? "Leiloes" : "Interessadas");
                }

                ModelState.AddModelError("usuarioInvalido", "Usuário não encontrado");
            }
            return View(model);
        }

        [HttpGet]
        public IActionResult Logout()
        {
            HttpContext.Session.Remove("usuarioLogado");
            return RedirectToAction("Index", new { Controller = "Home" });
        }
    }
}