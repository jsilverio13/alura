using AluraTunesData;
using System;
using System.Linq;

namespace Alura.Tunes.Linq.Linq2
{
    public static class LinqSelfJoin
    {
        public static void Execute()
        {
            using (var contexto = new AluraTunesEntities())
            {
                const string nomeDaMusica = "Smells Like Teen Spirit";

                var faixaIds = contexto.Faixas.Where(f => f.Nome == nomeDaMusica).Select(f => f.FaixaId);

                var query =
                    from comprouItem in contexto.ItemNotaFiscals
                    join comprouTambem in contexto.ItemNotaFiscals on comprouItem.NotaFiscalId equals comprouTambem.NotaFiscalId
                    where faixaIds.Contains(comprouItem.FaixaId) && comprouItem.FaixaId != comprouTambem.FaixaId
                    select comprouTambem;

                foreach (var item in query)
                {
                    Console.WriteLine($"{item.FaixaId} {item.Faixa.Nome}");
                }
            }

            Console.ReadKey();
        }
    }
}