using AluraTunesData;
using System;
using System.Linq;

namespace Alura.Tunes.Linq
{
    public static class LinqTopVendas
    {
        public static void Execute()
        {
            using (var contexto = new AluraTunesEntities())
            {
                var faixaQuery =
                     from f in contexto.Faixas
                     where f.ItemNotaFiscals.Count > 0
                     let TotalDeVendas = f.ItemNotaFiscals.Sum(inf => inf.Quantidade * inf.PrecoUnitario)
                     orderby TotalDeVendas descending
                     select new
                     {
                         f.FaixaId,
                         f.Nome,
                         Total = TotalDeVendas
                     };

                var produtoMaisVendido = faixaQuery.First();

                Console.WriteLine($"{produtoMaisVendido.FaixaId}\t{produtoMaisVendido.Nome}\t{produtoMaisVendido.Total}");

                var query =
                    from inf in contexto.ItemsNotaFiscal
                    where inf.FaixaId == produtoMaisVendido.FaixaId
                    select new
                    {
                        NomeCliente = inf.NotaFiscal.Cliente.PrimeiroNome + " " + inf.NotaFiscal.Cliente.Sobrenome
                    };

                foreach (var cliente in query)
                {
                    Console.WriteLine(cliente.NomeCliente);
                }
            }
        }
    }
}