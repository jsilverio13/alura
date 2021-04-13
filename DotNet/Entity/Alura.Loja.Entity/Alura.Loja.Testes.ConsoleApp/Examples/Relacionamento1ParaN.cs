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
    public static class Relacionamento1ParaN
    {
        public static void Comprar()
        {
            var pao = new Produto
            {
                Nome = "Pao frances",
                PrecoUnitario = 0.4,
                Unidade = "Unidade",
                Categoria = "Padaria"
            };

            var compra = new Compra
            {
                Quantidade = 6,
                Produto = pao,
                Preco = pao.PrecoUnitario * 6
            };

            using (var contexto = new LojaContext())
            {
                var serviceProvider = contexto.GetInfrastructure();
                var loggerFactory = serviceProvider.GetService<ILoggerFactory>();
                loggerFactory.AddProvider(SqlLoggerProvider.Create());

                contexto.Compras.Add(compra);
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