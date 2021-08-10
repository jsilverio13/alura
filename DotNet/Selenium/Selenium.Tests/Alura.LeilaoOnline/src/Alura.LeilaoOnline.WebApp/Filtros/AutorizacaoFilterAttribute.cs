using Alura.LeilaoOnline.Core;
using Alura.LeilaoOnline.WebApp.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace Alura.LeilaoOnline.WebApp.Filtros
{
    public class AutorizacaoFilterAttribute : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var usuarioLogado = context.HttpContext.Session.Get<Usuario>("usuarioLogado");
            if (usuarioLogado == null)
            {
                context.Result = new RedirectToActionResult("Login", "Autenticacao", null);
            }
        }
    }
}