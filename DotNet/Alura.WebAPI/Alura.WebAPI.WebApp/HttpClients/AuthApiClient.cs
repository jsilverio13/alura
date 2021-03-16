using Alura.WebAPI.Seguranca;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace Alura.WebAPI.WebApp.HttpClients
{
    public class LoginResult
    {
        public string Token { get; set; }
        public bool Succeeded { get; set; }

        public LoginResult(string token, HttpStatusCode statusCode)
        {
            Token = token;
            Succeeded = (statusCode == HttpStatusCode.OK);
        }
    }

    public class AuthApiClient
    {
        private readonly HttpClient _httpClient;

        public AuthApiClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<LoginResult> PostLoginAsync(LoginModel model)
        {
            var resposta = await _httpClient.PostAsJsonAsync("login", model).ConfigureAwait(false);
            return new LoginResult(await resposta.Content.ReadAsStringAsync().ConfigureAwait(false), resposta.StatusCode);
        }

        public async Task PostRegisterAsync(RegisterViewModel model)
        {
            var resposta = await _httpClient.PostAsJsonAsync("usuarios", model).ConfigureAwait(false);
            resposta.EnsureSuccessStatusCode();
        }
    }
}