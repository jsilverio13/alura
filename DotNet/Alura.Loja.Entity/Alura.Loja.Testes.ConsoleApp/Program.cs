using Alura.Loja.Testes.ConsoleApp.Model;
using Alura.Loja.Testes.ConsoleApp.Repository;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Alura.Loja.Testes.ConsoleApp
{
    public static class Program
    {
        private static readonly Dictionary<int, Action> metodos = new Dictionary<int, Action>
        {
            {1 , RecuperarProdutos },
            {2 , ExcluirProdutos },
            {3 , AtualizarProduto },
            {4 , GravarUsandoEntity },
            {5 , GravarUsandoAdoNet },
            {0 , Sair },
        };

        public static void Main()
        {
            MontarMenu();
            Console.ReadKey();
        }

        private static void MontarMenu()
        {
            Console.Clear();
            Console.WriteLine("###############################");
            Console.WriteLine("Escolha uma opção:");
            foreach (var item in metodos)
            {
                Console.WriteLine($"{item.Key} - {item.Value.Method.Name}");
            }
            Console.WriteLine("###############################");

            var escolha = Console.ReadKey();

            Console.WriteLine();

            int.TryParse(escolha.KeyChar.ToString(), out int escolhaInt);

            if (metodos.ContainsKey(escolhaInt))
            {
                metodos[escolhaInt].Invoke();
                Console.WriteLine($"{metodos[escolhaInt].Method.Name} executado com sucesso.");
                Console.WriteLine("Pressione qualquer tecla para voltar ao menu");
                Console.ReadKey();
            }
            else
            {
                Console.WriteLine("Opção inválida");
                Console.WriteLine("Pressione qualquer tecla para voltar ao menu");
            }

            MontarMenu();
        }

        private static void GravarUsandoAdoNet()
        {
            var produto = new Produto
            {
                Nome = "Harry Potter e a Ordem da Fênix",
                Categoria = "Livros",
                PrecoUnitario = 19.89
            };

            using (var repo = new ProdutoDAOEntity())
            {
                repo.Adicionar(produto);
            }
        }

        private static void GravarUsandoEntity()
        {
            var p1 = new Produto
            {
                Nome = "Harry Potter e a Ordem da Fênix",
                Categoria = "Livros",
                PrecoUnitario = 19.89
            };

            var p2 = new Produto
            {
                Nome = "Senhor dos Anéis 1",
                Categoria = "Livros",
                PrecoUnitario = 19.89
            };

            var p3 = new Produto
            {
                Nome = "O Monge e o Executivo",
                Categoria = "Livros",
                PrecoUnitario = 19.89
            };

            using (var repo = new ProdutoDAOEntity())
            {
                repo.Adicionar(p1);
                repo.Adicionar(p2);
                repo.Adicionar(p3);
            }
        }

        private static void ExcluirProdutos()
        {
            using (var repo = new ProdutoDAOEntity())
            {
                foreach (var item in repo.Produtos())
                {
                    repo.Remover(item);
                }
            }
        }

        private static void RecuperarProdutos()
        {
            using (var repo = new ProdutoDAOEntity())
            {
                var produtos = repo.Produtos();

                Console.WriteLine("###############################");
                Console.WriteLine($"Foram encontrados {produtos.Count} produto(s)");
                Console.WriteLine("###############################");
                Console.WriteLine();

                foreach (var item in produtos)
                {
                    Console.WriteLine(item.Nome);
                }

                Console.WriteLine();
            }
        }

        private static void AtualizarProduto()
        {
            GravarUsandoEntity();
            RecuperarProdutos();

            using (var repo = new ProdutoDAOEntity())
            {
                var primeiro = repo.Produtos().First();

                primeiro.Nome = "Cassino Royale - Editado";
                repo.Atualizar(primeiro);
            }

            RecuperarProdutos();
        }

        private static void Sair()
        {
            Environment.Exit(-1);
        }
    }
}