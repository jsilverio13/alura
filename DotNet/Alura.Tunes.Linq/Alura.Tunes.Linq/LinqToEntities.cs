using AluraTunesData;
using System;
using System.Linq;

namespace Alura.Tunes.Linq
{
    public static class LinqToEntities
    {
        public static void Execute()
        {
            using (var contexto = new AluraTunesEntities())
            {
                var query = from g in contexto.Generos
                            select g;

                foreach (var genero in query)
                {
                    Console.WriteLine($"{genero.GeneroId}\t{genero.Nome}");
                }

                var faixaEgenero = from g in contexto.Generos
                                   join f in contexto.Faixas
                                    on g.GeneroId equals f.GeneroId
                                   select new { f, g };

                faixaEgenero = faixaEgenero.Take(10);

                contexto.Database.Log = Console.WriteLine;

                Console.WriteLine();
                foreach (var item in faixaEgenero)
                {
                    Console.WriteLine($"{item.f.Nome}\t{item.g.Nome}");
                }

                Console.WriteLine();

                var textoBusca = "Led";

                var query2 = from a in contexto.Artistas
                             where a.Nome.Contains(textoBusca)
                             select a;

                foreach (var artista in query2)
                {
                    Console.WriteLine($"{artista.ArtistaId}\t{artista.Nome}");
                }

                var query3 = from a in contexto.Artistas
                             where a.Nome.Contains(textoBusca)
                             select a;

                foreach (var artista in query3)
                {
                    Console.WriteLine($"{artista.ArtistaId}\t{artista.Nome}");
                }

                var query4 = contexto.Artistas.Where(a => a.Nome.Contains(textoBusca));

                Console.WriteLine();

                foreach (var artista in query4)
                {
                    Console.WriteLine($"{artista.ArtistaId}\t{artista.Nome}");
                }
            }

            Console.ReadKey();
        }
    }
}