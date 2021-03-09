using Alura.ListaLeitura.Modelos;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace Alura.WebAPI.Api.Formatters
{
    public class LivroCsvFormatter : TextOutputFormatter
    {
        public LivroCsvFormatter()
        {
            var textCsvMediaType = MediaTypeHeaderValue.Parse("text/csv");
            var appCsvMediaType = MediaTypeHeaderValue.Parse("application/csv");
            SupportedMediaTypes.Add(textCsvMediaType);
            SupportedMediaTypes.Add(appCsvMediaType);
            SupportedEncodings.Add(Encoding.UTF8);
        }

        public override bool CanWriteResult(OutputFormatterCanWriteContext context)
        {
            return context.ObjectType == typeof(LivroApi);
        }

        public override Task WriteResponseBodyAsync(OutputFormatterWriteContext context, Encoding selectedEncoding)
        {
            var livroEmCsv = string.Empty;

            if (context.Object is LivroApi)
            {
                var livro = context.Object as LivroApi;

                livroEmCsv = $"{livro.Titulo};{livro.Subtitulo};{livro.Autor};{livro.Lista};{livro.Resumo};{livro.Id};";
            }

            using (var writer = context.WriterFactory(context.HttpContext.Response.Body, selectedEncoding))
            {
                return writer.WriteAsync(livroEmCsv);
            }
        }
    }
}