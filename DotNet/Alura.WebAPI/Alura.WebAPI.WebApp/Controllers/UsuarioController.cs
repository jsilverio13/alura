using Alura.WebAPI.Seguranca;
using Alura.WebAPI.WebApp.HttpClients;
using Alura.WebAPI.WebApp.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Alura.WebAPI.WebApp.Controllers
{
    public class UsuarioController : Controller
    {
        private readonly AuthApiClient _authApiClient;

        public UsuarioController(AuthApiClient authApiClient)
        {
            _authApiClient = authApiClient;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> Login()
        {
            await HttpContext.SignOutAsync().ConfigureAwait(false);
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _authApiClient.PostLoginAsync(model).ConfigureAwait(false);

                if (result.Succeeded)
                {
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, model.Login),
                        new Claim("Token", result.Token)
                    };

                    var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                    var claimsPrincipal = new ClaimsPrincipal(claimsIdentity);
                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, claimsPrincipal).ConfigureAwait(false);

                    return RedirectToAction("Index", "Home");
                }
                ModelState.AddModelError(string.Empty, "Erro na autenticação");
                return View(model);
            }
            return View(model);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Register()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        [AllowAnonymous]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
            }
            return View(model);
        }

        [HttpGet]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync().ConfigureAwait(false);

            return RedirectToAction(nameof(Login));
        }
    }
}