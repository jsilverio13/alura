using Alura.WebAPI.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Alura.WebAPI.Api.Filters
{
    public class LivroPaginacao
    {
        public int Tamanho { get; set; } = 25;
        public int Pagina { get; set; } = 1;

    }

    public class LivroPaginado
    {
        public int Total { get; set; }
        public int TamanhoPagina { get; set; }
        public int NumeroPagina { get; set; }
        public int TotalPaginas { get; set; }
        public IList<LivroApi> Resultado { get; set; }
        public string Anterior { get; set; }
        public string Proximo { get; set; }

    }

    public static class LivroPaginadoExtensions
    {
        public static LivroPaginado ToLivroPaginado(this IQueryable<LivroApi> query, LivroPaginacao paginacao)
        {
            int totalItens = query.Count();
            int totalPaginas = (int)Math.Ceiling(totalItens / (double)paginacao.Tamanho);

            return new LivroPaginado
            {
                Total = totalItens,
                TotalPaginas = totalPaginas,
                NumeroPagina = paginacao.Pagina,
                TamanhoPagina = paginacao.Tamanho,
                Resultado = query.Skip((paginacao.Pagina - 1) * paginacao.Tamanho).Take(paginacao.Tamanho).ToList(),
                Anterior =
                    paginacao.Pagina > 1 ?
                        $"livros?pagina{paginacao.Pagina - 1}&tamanho={paginacao.Tamanho}" :
                        "",
                Proximo = paginacao.Pagina < totalPaginas ?
                        $"livros?pagina{paginacao.Pagina + 1}&tamanho={paginacao.Tamanho}" :
                        ""
            };
        }
    }

    public static class LivroPaginacaoExtensions
    {
        public static IQueryable<Livro> AplicarPaginacao(this IQueryable<Livro> query, LivroPaginacao paginacao)
        {

            if (paginacao?.Pagina > 0 && paginacao?.Tamanho > 0)
            {
                query.Skip(paginacao.Pagina - 1 * paginacao.Tamanho).Take(paginacao.Tamanho);
            }

            return query;
        }
    }
}
