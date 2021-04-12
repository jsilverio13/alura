using Alura.Filmes.App.Dados;
using Alura.Filmes.App.Extensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Data.SqlClient;

namespace Alura.Filmes.App
{
    public static class Program
    {
        public static void Main()
        {
            using (var contexto = new AluraFilmesContexto())
            {
                contexto.LogSQLToConsole();

                var categ = "Comedy"; //36

                var paramCateg = new SqlParameter("category_name", categ);

                var paramTotal = new SqlParameter
                {
                    ParameterName = "@total_actors",
                    Size = 4,
                    Direction = System.Data.ParameterDirection.Output
                };

                contexto.Database
                    .ExecuteSqlCommand("total_actors_from_given_category @category_name, @total_actors OUT", paramCateg, paramTotal);

                Console.WriteLine($"O total de atores na categoria {categ} é de {paramTotal.Value}.");
            }

            Console.ReadKey();
        }
    }
}