using Alura.ListaLeitura.Modelos;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Alura.WebAPI.WebApp.HttpClients
{
    public class LivroApiClient
    {
        private readonly HttpClient _httpClient;

        public LivroApiClient(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<byte[]> GetCapaLivrosAsync(int id)
        {
            var response = await _httpClient.GetAsync($"livros/{id}/capa").ConfigureAwait(false);

            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsByteArrayAsync().ConfigureAwait(false);
        }

        public async Task<LivroApi> GetLivrosAsync(int id)
        {
            var response = await _httpClient.GetAsync($"livros/{id}").ConfigureAwait(false);

            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsAsync<LivroApi>().ConfigureAwait(false);
        }

        public async Task DeleteLivroAsync(int id)
        {
            var response = await _httpClient.DeleteAsync($"livros/{id}").ConfigureAwait(false);

            response.EnsureSuccessStatusCode();
        }

        public async Task<ListaLeitura.Modelos.ListaLeitura> GetLeituraAsync(TipoListaLeitura tipo)
        {
            var response = await _httpClient.GetAsync($"listasleitura/{tipo}").ConfigureAwait(false);

            response.EnsureSuccessStatusCode();

            return await response.Content.ReadAsAsync<ListaLeitura.Modelos.ListaLeitura>().ConfigureAwait(false);
        }

        public async Task PostLivroAsync(LivroUpload model)
        {
            HttpContent content = CreateMultiPartFormDataContent(model);

            var reponse = await _httpClient.PostAsync($"livros", content).ConfigureAwait(false);

            reponse.EnsureSuccessStatusCode();
        }

        public async Task PutLivroAsync(LivroUpload model)
        {
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
    }
}