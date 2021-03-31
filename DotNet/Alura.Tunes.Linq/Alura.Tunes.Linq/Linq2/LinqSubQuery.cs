using AluraTunesData;
using System;
using System.Linq;

namespace Alura.Tunes.Linq.Linq2
{
    public static class LinqSubQuery
    {
        public static void Execute()
        {
            using (var contexto = new AluraTunesEntities())
            {
                decimal media = contexto.NotaFiscals.Average(n => n.Total);
                var query =
                  from nf in contexto.NotaFiscals
                  where nf.Total > media
                  orderby nf.Total descending
                  select new
                  {
                      Numero = nf.NotaFiscalId,
                      Data = nf.DataNotaFiscal,
                      Cliente = nf.Cliente.PrimeiroNome + " " + nf.Cliente.Sobrenome,
                      Valor = nf.Total
                  };

                foreach (var notaFiscal in query)
                {
                    Console.WriteLine("{0}\t{1}\t{2}\t{3}",
                       notaFiscal.Numero,
                       notaFiscal.Data,
                       notaFiscal.Cliente,
                       notaFiscal.Valor);
                }

                Console.WriteLine($"A média é {media}");
                Console.ReadKey();
            }
        }
    }
}