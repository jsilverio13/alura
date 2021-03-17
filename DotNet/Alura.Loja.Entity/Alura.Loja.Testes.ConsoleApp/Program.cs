using Alura.Loja.Testes.ConsoleApp.Context;

namespace Alura.Loja.Testes.ConsoleApp
{
    public static class Program
    {
        private static void Main(string[] args)
        {
            GravarUsandoEntity();
        }

        private static void GravarUsandoEntity()
        {
            var p1 = new Produto
            {
                Nome = "Harry Potter e a Ordem da Fênix",
                Categoria = "Livros",
                Preco = 19.89
            };

            var p2 = new Produto
            {
                Nome = "Senhor dos Anéis 1",
                Categoria = "Livros",
                Preco = 19.89
            };

            var p3 = new Produto
            {
                Nome = "O Monge e o Executivo",
                Categoria = "Livros",
                Preco = 19.89
            };

            using (var contexto = new LojaContext())
            {
                contexto.Produtos.AddRange(p1, p2, p3);
                contexto.SaveChanges();
            }
        }
    }
}