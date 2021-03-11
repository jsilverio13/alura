using Alura.WebAPI.Seguranca;
using System.Net.Http;
using System.Threading.Tasks;

namespace Alura.WebAPI.WebApp.HttpClients
{
    public class AuthApiClient
    {
        private readonly HttpClient _httpClient;

        public AuthApiClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<LoginResult> PostLoginAsync(LoginModel model)
        {
            var response = await _httpClient.PostAsJsonAsync("login", model);

            var result = new LoginResult
            {
                Succeeded = response.IsSuccessStatusCode,
                Token = await response.Content.ReadAsStringAsync()
            };

            return result;
        }
    }

    public class LoginResult
    {
        public bool Succeeded { get; set; }

        public string Token { get; set; }
    }
}