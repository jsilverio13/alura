using Alura.WebAPI.Model;
using Microsoft.AspNetCore.Http;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Alura.WebAPI.WebApp.HttpClients
{
    public class LivroApiClient
    {
        private readonly HttpClient _httpClient;
        private readonly IHttpContextAccessor _acessor;

        public LivroApiClient(HttpClient httpClient, IHttpContextAccessor acessor)
        {
            _httpClient = httpClient;
            _acessor = acessor;
        }

        public async Task<byte[]> GetCapaLivrosAsync(int id)
        {
            AddBearerToken();
            var response = await _httpClient.GetAsync($"livros/{id}/capa").ConfigureAwait(false);

            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsByteArrayAsync().ConfigureAwait(false);
        }

        public async Task<LivroApi> GetLivrosAsync(int id)
        {
            AddBearerToken();
            var response = await _httpClient.GetAsync($"livros/{id}").ConfigureAwait(false);

            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsAsync<LivroApi>().ConfigureAwait(false);
        }

        public async Task DeleteLivroAsync(int id)
        {
            AddBearerToken();
            var response = await _httpClient.DeleteAsync($"livros/{id}").ConfigureAwait(false);

            response.EnsureSuccessStatusCode();
        }

        public async Task<ListaLeitura> GetLeituraAsync(TipoListaLeitura tipo)
        {
            AddBearerToken();
            var response = await _httpClient.GetAsync($"listasleitura/{tipo}").ConfigureAwait(false);

            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsAsync<ListaLeitura>().ConfigureAwait(false);
        }

        public async Task PostLivroAsync(LivroUpload model)
        {
            AddBearerToken();
            HttpContent content = CreateMultiPartFormDataContent(model);

            var reponse = await _httpClient.PostAsync($"livros", content).ConfigureAwait(false);

            reponse.EnsureSuccessStatusCode();
        }

        public async Task PutLivroAsync(LivroUpload model)
        {
            AddBearerToken();
            HttpContent content = CreateMultiPartFormDataContent(model);

            var reponse = await _httpClient.PutAsync($"livros", content).ConfigureAwait(false);

            reponse.EnsureSuccessStatusCode();
        }

        private static HttpContent CreateMultiPartFormDataContent(LivroUpload model)
        {
            var content = new MultipartFormDataContent
            {
                { new StringContent(model.Titulo), "titulo".EnvolveComAspasDuplas()  },
                { new StringContent(model.Subtitulo), "subtitulo".EnvolveComAspasDuplas() },
                { new StringContent(model.Resumo), "resumo".EnvolveComAspasDuplas() },
                { new StringContent(model.Autor), "autor".EnvolveComAspasDuplas() },
                { new StringContent(model.Lista.ParaString()), "lista".EnvolveComAspasDuplas() }
            };

            if (model.Id > 0)
            {
                content.Add(new StringContent(model.Id.ToString()), "id".EnvolveComAspasDuplas());
            }

            if (model.Capa != null)
            {
                var imagemContent = new ByteArrayContent(model.Capa.ConvertToBytes());
                content.Headers.ContentType = new MediaTypeHeaderValue("image/png");
                content.Add(imagemContent, "capa".EnvolveComAspasDuplas(), "capa.png".EnvolveComAspasDuplas());
            }

            return content;
        }

        private void AddBearerToken()
        {
            string token = _acessor.HttpContext.User.Claims.First(c => c.Type == "Token").Value;

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
        }
    }
}