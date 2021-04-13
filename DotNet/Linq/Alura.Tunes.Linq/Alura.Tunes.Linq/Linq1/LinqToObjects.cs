using Alura.Tunes.Linq.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Alura.Tunes.Linq.Linq1
{
    public static class LinqToObjects
    {
        public static void Execute()
        {
            var generos = new List<Genero>
            {
                new Genero { Id = 1, Nome = "Rock" },
                new Genero { Id = 2, Nome = "Reggae" },
                new Genero { Id = 3, Nome = "Rock Progressivo" },
                new Genero { Id = 4, Nome = "Jazz" },
                new Genero { Id = 5, Nome = "Punk Rock" },
                new Genero { Id = 6, Nome = "Clássica" }
            };

            var query = from g in generos
                        where g.Nome.Contains("Rock")
                        select g;

            foreach (var genero in query)
            {
                Console.WriteLine($"{genero.Id}\t{genero.Nome}");
            }

            List<Musica> musicas = new List<Musica>
            {
                new Musica { Id = 1, Nome = "Sweet Child O'Mine", GeneroId = 1 },
                new Musica { Id = 2, Nome = "I Shot The Sheriff", GeneroId = 2 },
                new Musica { Id = 3, Nome = "Danúbio Azul", GeneroId = 6 }
            };

            Console.WriteLine();

            var queryMusicas
                = from m in musicas
                  join g in generos on m.GeneroId equals g.Id
                  select new
                  {
                      MusicaId = m.Id,
                      Musica = m.Nome,
                      Genero = g.Nome
                  };

            foreach (var musicaEgenero in queryMusicas)
            {
                Console.WriteLine($"{musicaEgenero.MusicaId}\t{musicaEgenero.Musica.PadRight(20)}\t{musicaEgenero.Genero}");
            }

            Console.ReadKey();
        }
    }
}