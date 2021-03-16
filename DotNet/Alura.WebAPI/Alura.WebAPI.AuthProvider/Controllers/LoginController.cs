using Alura.WebAPI.DAL.Usuarios;
using Alura.WebAPI.Seguranca;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Alura.WebAPI.AuthProvider.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly SignInManager<Usuario> _signInManager;

        public LoginController(SignInManager<Usuario> signInManager)
        {
            _signInManager = signInManager;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Login, model.Password, false, false).ConfigureAwait(false);

                if (result.Succeeded)
                {
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Sub, model.Login),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                    };

                    var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("alura-webapi-authentication-valid"));
                    var credencials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                    var token = new JwtSecurityToken(
                        issuer: "Alura.WebApp",
                        audience: "Postman",
                        claims: claims,
                        signingCredentials: credencials,
                        expires: DateTime.Now.AddMinutes(30)
                        );

                    var tokenString = new JwtSecurityTokenHandler().WriteToken(token);

                    return Ok(tokenString);
                }

                return Unauthorized();
            }

            return BadRequest();
        }
    }
}