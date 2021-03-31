using AluraTunesData;
using System;
using System.Linq;

namespace Alura.Tunes.Linq.Linq2
{
    public static class LinqProcedure
    {
        public static void Execute()
        {
            using (var contexto = new AluraTunesEntities())
            {
                int? clienteId = 17;

                var vendasPorCliente =
                    from v in contexto.ps_Itens_Por_Cliente(clienteId)
                    group v by new { v.DataNotaFiscal.Year, v.DataNotaFiscal.Month }
                        into agrupado
                    orderby agrupado.Key.Year, agrupado.Key.Month
                    select new
                    {
                        Ano = agrupado.Key.Year,
                        Mes = agrupado.Key.Month,
                        Total = agrupado.Sum(t => t.Total)
                    };

                foreach (var item in vendasPorCliente)
                {
                    Console.WriteLine("{0}\t{1}\t{2}", item.Ano, item.Mes, item.Total);
                }
                Console.ReadKey();
            }
        }
    }
}