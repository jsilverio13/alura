using Alura.WebAPI.Model;
using System.Linq;

namespace Alura.WebAPI.Api.Queries
{
    public class LivroFiltro
    {
        public string Autor { get; set; }
        public string Titulo { get; set; }
        public string Subtitulo { get; set; }
        public string Lista { get; set; }

    }

    public static class LivroFiltroExtensions
    {
        public static IQueryable<Livro> AplicarFiltro(this IQueryable<Livro> query, LivroFiltro filtro)
        {
            if (filtro != null)
            {
                if (!string.IsNullOrWhiteSpace(filtro.Titulo))
                {
                    query = query.Where(l => l.Titulo.Contains(filtro.Titulo));
                }

                if (!string.IsNullOrWhiteSpace(filtro.Autor))
                {
                    query = query.Where(l => l.Autor.Contains(filtro.Autor));
                }

                if (!string.IsNullOrWhiteSpace(filtro.Subtitulo))
                {
                    query = query.Where(l => l.Subtitulo.Contains(filtro.Subtitulo));
                }

                if (!string.IsNullOrWhiteSpace(filtro.Lista))
                {
                    query = query.Where(l => l.Lista.ParaString().Equals(filtro.Lista));
                }
            }

            return query;
        }
    }
}
