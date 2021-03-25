using Alura.Filmes.App.Dados;
using Alura.Filmes.App.Extensions;
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

                Console.WriteLine("Clientes");
                foreach (var cliente in contexto.Clientes)
                {
                    Console.WriteLine(cliente);
                }

                Console.WriteLine("");
                Console.WriteLine("Funcionarios");
                foreach (var funcionario in contexto.Funcionarios)
                {
                    Console.WriteLine(funcionario);
                }
            }

            Console.ReadKey();
        }
    }
}