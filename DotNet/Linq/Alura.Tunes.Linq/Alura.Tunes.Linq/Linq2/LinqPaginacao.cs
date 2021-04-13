using AluraTunesData;
using System;
using System.Linq;

namespace Alura.Tunes.Linq.Linq2
{
    public static class LinqPaginacao
    {
        private const int TAMANHO_PAGINA = 10;

        public static void Execute()
        {
            using (var contexto = new AluraTunesEntities())
            {
                int numeroPagina = 5;

                var numeroNotasFiscais = contexto.NotaFiscals.Count();
                decimal numerosPaginas = Math.Ceiling(Convert.ToDecimal(numeroNotasFiscais / TAMANHO_PAGINA));

                for (int p = 1; p <= numerosPaginas; p++)
                {
                    ImprimirPagina(contexto, p);
                }
            }

            Console.ReadKey();
        }

        private static void ImprimirPagina(AluraTunesEntities contexto, int numeroPagina)
        {
            var query =
                                from nf in contexto.NotaFiscals
                                orderby nf.NotaFiscalId
                                select new
                                {
                                    Numero = nf.NotaFiscalId,
                                    Data = nf.DataNotaFiscal,
                                    Cliente = nf.Cliente.PrimeiroNome + " " + nf.Cliente.Sobrenome,
                                    nf.Total
                                };

            int numeroPulos = (numeroPagina - 1) * TAMANHO_PAGINA;

            query = query.Skip(numeroPulos).Take(TAMANHO_PAGINA);
            Console.WriteLine();
            Console.WriteLine($"Número da pagina: {numeroPagina}");
            foreach (var nf in query)
            {
                Console.WriteLine("{0}\t{1}\t{2}\t{3}", nf.Numero, nf.Data, nf.Cliente, nf.Total);
            }
        }
    }
}