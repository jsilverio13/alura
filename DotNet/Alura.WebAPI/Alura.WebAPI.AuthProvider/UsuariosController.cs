using Alura.WebAPI.DAL.Usuarios;
using Alura.WebAPI.Seguranca;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Alura.WebAPI.AuthProvider
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly UserManager<Usuario> _userManager;
        private readonly SignInManager<Usuario> _signInManager;

        public UsuariosController(UserManager<Usuario> userManager, SignInManager<Usuario> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        public async Task<IActionResult> CriaUsuario(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new Usuario { UserName = model.Login };
                var result = await _userManager.CreateAsync(user, model.Password).ConfigureAwait(false);
                if (result.Succeeded)
                {
                    await _signInManager.SignInAsync(user, isPersistent: false).ConfigureAwait(false);
                    return Ok(model);
                }
            }
            return BadRequest();
        }
    }
}