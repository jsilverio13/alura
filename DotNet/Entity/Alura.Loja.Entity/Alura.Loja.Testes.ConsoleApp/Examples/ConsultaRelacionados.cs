using Alura.Loja.Testes.ConsoleApp.Repository.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Alura.Loja.Testes.ConsoleApp.Examples
{
    public static class ConsultaRelacionados
    {
        public static void ConsultarRelacionados()
        {
            using (var contexto = new LojaContext())
            {
                var serviceProvider = contexto.GetInfrastructure();
                var loggerFactory = serviceProvider.GetService<ILoggerFactory>();
                loggerFactory.AddProvider(SqlLoggerProvider.Create());

                var cliente =
                    contexto
                    .Clientes
                    .Include(e => e.EnderecoEntrega)
                    .First();

                Console.WriteLine($"Endereço de entrega: {cliente.EnderecoEntrega.Logradouro}");

                var produto =
                    contexto
                    .Produtos
                    .Include(c => c.Compras)
                    .First(p => p.Id == 1036);

                contexto.Entry(produto).Collection(p => p.Compras).Query().Where(c => c.Preco > 10).Load();

                Console.WriteLine($"Mostrando compras do produto {produto.Nome}");
                foreach (var item in produto.Compras)
                {
                    Console.WriteLine(item);
                }
            }
        }

        private static void ExibirProdutosPromocao()
        {
            using (var contexto2 = new LojaContext())
            {
                var promocao =
                    contexto2
                    .Promocoes
                    .Include(p => p.Produtos)
                    .ThenInclude(pp => pp.Produto)
                    .First();

                Console.WriteLine("\nMotrando os produtos da promoção...");

                foreach (var item in promocao.Produtos)
                {
                    Console.WriteLine(item.Produto);
                }
            }
        }

        private static void IncluirPromocao()
        {
            using (var contexto = new LojaContext())
            {
                var serviceProvider = contexto.GetInfrastructure();
                var loggerFactory = serviceProvider.GetService<ILoggerFactory>();
                loggerFactory.AddProvider(SqlLoggerProvider.Create());

                var promocao = new Model.Promocao
                {
                    Descricao = "Queima Total 2017",
                    DataInicio = new DateTime(2017, 1, 1),
                    DataFim = new DateTime(2017, 1, 31)
                };

                var produtos = contexto.Produtos.Where(p => p.Categoria == "Bebidas").ToList();

                produtos.ForEach(p => promocao.IncluiProduto(p));

                contexto.Promocoes.Add(promocao);

                ExibeEntries(contexto.ChangeTracker.Entries());

                contexto.SaveChanges();
            }
        }

        public static void ExibeEntries(IEnumerable<EntityEntry> entries)
        {
            foreach (var e in entries)
            {
                Console.WriteLine(e.Entity + " - " + e.State);
            }
        }
    }
}