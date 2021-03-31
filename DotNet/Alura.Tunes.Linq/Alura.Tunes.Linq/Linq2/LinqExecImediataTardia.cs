using AluraTunesData;
using System;
using System.Linq;

namespace Alura.Tunes.Linq.Linq2
{
    public static class LinqExecImediataTardia
    {
        public static void Execute()
        {
            using (var contexto = new AluraTunesEntities())
            {
                int mesAniversario = 1;

                while (mesAniversario <= 12)
                {
                    Console.WriteLine($"Mês: {mesAniversario}");

                    var query = (from f in contexto.Funcionarios
                                 let mes = f.DataNascimento.Value.Month
                                 orderby mes, f.DataNascimento.Value.Day
                                 where mes.Equals(mesAniversario)
                                 select f).ToList();

                    mesAniversario++;

                    foreach (var f in query)
                    {
                        Console.WriteLine($"{f.DataNascimento}\t{f.PrimeiroNome} {f.Sobrenome}");
                    }
                }
            }

            Console.ReadKey();
        }
    }
}