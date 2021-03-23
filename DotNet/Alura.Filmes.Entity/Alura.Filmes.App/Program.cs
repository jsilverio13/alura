using Alura.Filmes.App.Dados;
using Alura.Filmes.App.Extensions;
using Microsoft.EntityFrameworkCore;
using System;

namespace Alura.Filmes.App
{
    public static class Program
    {
        public static void Main()
        {
            using (var contexto = new AluraFilmesContexto())
            {
                contexto.LogSQLToConsole();

                var idiomas = contexto.Idiomas
                    .Include(i => i.FilmesFalados);

                foreach (var idioma in idiomas)
                {
                    Console.WriteLine(idioma);

                    foreach (var filme in idioma.FilmesFalados)
                    {
                        Console.WriteLine(filme);
                    }
                    Console.WriteLine("\n");
                }
            }

            Console.ReadKey();
        }
    }
}