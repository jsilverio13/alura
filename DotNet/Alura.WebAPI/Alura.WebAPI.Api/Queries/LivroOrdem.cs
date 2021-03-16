using Alura.WebAPI.Model;
using System.Linq;
using System.Linq.Dynamic.Core;


namespace Alura.WebAPI.Api.Queries
{
    public class LivroOrdem
    {
        public string OrdernarPor { get; set; }
    }

    public static class LivroOrdemExtensions
    {
        public static IQueryable<Livro> AplicarOrdem(this IQueryable<Livro> query, LivroOrdem ordem)
        {
            if (ordem.OrdernarPor != null)
            {
                query.OrderBy(ordem.OrdernarPor);
            }

            return query;
        }
    }
}
