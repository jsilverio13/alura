using Alura.Loja.Testes.ConsoleApp.Model;
using Alura.Loja.Testes.ConsoleApp.Repository.Context;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;

namespace Alura.Loja.Testes.ConsoleApp.Examples
{
    public static class RelacionamentoNparaN
    {
        public static void RegistrarPromocao()
        {
            var produto1 = new Produto() { Nome = "Suco de Laranja", Categoria = "Bebidas", PrecoUnitario = 8.79, Unidade = "Litros" };
            var produto2 = new Produto() { Nome = "Café", Categoria = "Bebidas", PrecoUnitario = 12.45, Unidade = "Gramas" };
            var produto3 = new Produto() { Nome = "Macarrão", Categoria = "Alimentos", PrecoUnitario = 4.23, Unidade = "Gramas" };

            var promocacao = new Promocao
            {
                Descricao = "Pascoa Feliz",
                DataInicio = DateTime.Now,
                DataFim = DateTime.Now.AddMonths(3),
            };

            promocacao.IncluiProduto(produto1);
            promocacao.IncluiProduto(produto2);
            promocacao.IncluiProduto(produto3);

            using (var contexto = new LojaContext())
            {
                var serviceProvider = contexto.GetInfrastructure();
                var loggerFactory = serviceProvider.GetService<ILoggerFactory>();
                loggerFactory.AddProvider(SqlLoggerProvider.Create());

                contexto.Promocoes.Add(promocacao);

                var promocao = contexto.Promocoes.Find(1);

                contexto.Promocoes.Remove(promocao);

                ExibeEntries(contexto.ChangeTracker.Entries());

                contexto.SaveChanges();
            }
        }

        private static void ExibeEntries(IEnumerable<EntityEntry> entries)
        {
            foreach (var e in entries)
            {
                Console.WriteLine(e.Entity + " - " + e.State);
            }
        }
    }
}