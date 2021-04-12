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
    public static class Relacionamento1Para1
    {
        public static void RegistararCliente()
        {
            var cliente = new Cliente
            {
                Nome = "Jefferson",
                EnderecoEntrega = new Endereco
                {
                    Numero = 123,
                    Logradouro = "Rua",
                    Complemento = "Apartamento",
                    Bairro = "Jardim",
                    Cidade = "Americana"
                }
            };

            using (var contexto = new LojaContext())
            {
                var serviceProvider = contexto.GetInfrastructure();
                var loggerFactory = serviceProvider.GetService<ILoggerFactory>();
                loggerFactory.AddProvider(SqlLoggerProvider.Create());

                contexto.Clientes.Add(cliente);

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