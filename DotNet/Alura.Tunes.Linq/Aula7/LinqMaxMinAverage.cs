using AluraTunesData;
using System;
using System.Linq;
using System.Linq.Expressions;

namespace Aula7
{
    public static class LinqMaxMinAverage
    {
        public static void Execute()
        {
            using (var contexto = new AluraTunesEntities())
            {
                var vendaMediana = Mediana(contexto.NotasFiscais.Select(ag => ag.Total));
                Console.WriteLine($"Venda Mediana: R$ {vendaMediana}");

                vendaMediana = contexto.NotasFiscais.Mediana(ag => ag.Total);
                Console.WriteLine($"Venda Mediana: R$ {vendaMediana}");
            }

            Console.ReadKey();
        }

        public static decimal Mediana(IQueryable<decimal> origem)
        {
            int contagem = origem.Count();
            var ordenado = origem.OrderBy(p => p);

            var elementoCentral_1 = ordenado.Skip((contagem - 1) / 2).First();
            var elementoCentral_2 = ordenado.Skip(contagem / 2).First();

            decimal mediana = (elementoCentral_1 + elementoCentral_2) / 2;

            return mediana;
        }
    }

    public static class Extensions
    {
        public static decimal Mediana<TSource>(this IQueryable<TSource> origem, Expression<Func<TSource, decimal>> selector)
        {
            int contagem = origem.Count();

            var funcSeletor = selector.Compile();
            var ordenado = origem
                .Select(selector)
                .OrderBy(x => x);

            var elementoCentral_1 = ordenado.Skip((contagem - 1) / 2).First();
            var elementoCentral_2 = ordenado.Skip(contagem / 2).First();

            decimal mediana = (elementoCentral_1 + elementoCentral_2) / 2;

            return mediana;
        }
    }
}